package main

import (
	"archive/zip"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) GetSavePath(filename string) string {
	configDir, err := os.UserConfigDir()
	if err != nil {
		configDir = os.Getenv("APPDATA")
	}
	dir := filepath.Join(configDir, "GD-Organizer")
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err := os.MkdirAll(dir, 0755)
		if err != nil {
			fmt.Println("Error creating config dir:", err)
		}
	}
	return filepath.Join(dir, filename)
}

func (a *App) SaveData(filename string, content string) error {
	path := a.GetSavePath(filename)
	err := os.WriteFile(path, []byte(content), 0644)
	if err != nil {
		fmt.Printf("Error saving %s: %v\n", filename, err)
	}
	return err
}

func (a *App) LoadData(filename string) string {
	path := a.GetSavePath(filename)
	data, err := os.ReadFile(path)
	if err != nil {
		return ""
	}
	return string(data)
}

func (a *App) AnalyzeGame(folderPath string) GameInstance {
	return GameInstance{HasGeode: false, Version: "2.206"}
}

func (a *App) GetMods(folderPath string) []ModInfo {
	modsPath := filepath.Join(folderPath, "geode", "mods")
	files, err := os.ReadDir(modsPath)
	if err != nil {
		return []ModInfo{}
	}

	var results []ModInfo
	for _, f := range files {
		name := f.Name()
		if strings.HasSuffix(name, ".geode") || strings.HasSuffix(name, ".disabled") {
			id := strings.TrimSuffix(strings.TrimSuffix(name, ".disabled"), ".geode")
			info := a.extractModInfoNative(filepath.Join(modsPath, name))

			displayName := id
			version := "1.0.0"
			description := ""
			var deps []string

			if info != nil {
				if internalID, ok := info["id"].(string); ok {
					id = internalID
				}
				if n, ok := info["name"].(string); ok {
					displayName = n
				} else if n, ok := info["n"].(string); ok {
					displayName = n
				}
				if v, ok := info["version"].(string); ok {
					version = v
				} else if v, ok := info["v"].(string); ok {
					version = v
				}
				if d, ok := info["description"].(string); ok {
					description = d
				} else if d, ok := info["d"].(string); ok {
					description = d
				}

				if dependencies, ok := info["dependencies"]; ok {
					switch d := dependencies.(type) {
					case []any:
						for _, dep := range d {
							if dID, ok := dep.(string); ok {
								deps = append(deps, dID)
							} else if dMap, ok := dep.(map[string]any); ok {
								if dID, ok := dMap["id"].(string); ok {
									deps = append(deps, dID)
								}
							}
						}
					case map[string]any:
						for k := range d {
							deps = append(deps, k)
						}
					}
				}
			}

			results = append(results, ModInfo{
				ID: id, Name: displayName, Enabled: !strings.HasSuffix(name, ".disabled"), File: name, Version: version, Description: description, Dependencies: deps,
			})
		}
	}
	return results
}

func (a *App) extractModInfoNative(zipPath string) map[string]any {
	r, err := zip.OpenReader(zipPath)
	if err != nil {
		return nil
	}
	defer r.Close()
	for _, f := range r.File {
		if f.Name == "mod.json" {
			rc, err := f.Open()
			if err != nil {
				return nil
			}
			defer rc.Close()
			var data map[string]any
			json.NewDecoder(rc).Decode(&data)
			return data
		}
	}
	return nil
}

func (a *App) ToggleMod(folderPath string, modID string, enabled bool, fileName string) map[string]any {
	modsPath := filepath.Join(folderPath, "geode", "mods")
	oldPath := filepath.Join(modsPath, fileName)
	newName := strings.TrimSuffix(strings.TrimSuffix(fileName, ".disabled"), ".geode")
	if !enabled {
		newName += ".geode.disabled"
	} else {
		newName += ".geode"
	}
	os.Rename(oldPath, filepath.Join(modsPath, newName))
	return map[string]any{"success": true}
}

func (a *App) LaunchGame(folderPath string) {
}

func (a *App) OpenFolder() string {
	res, _ := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{Title: "Select GD Folder"})
	return res
}

func (a *App) OpenFile(filters []runtime.FileFilter) string {
	res, _ := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{Title: "Select File", Filters: filters})
	return res
}

func (a *App) DeleteMod(folderPath string, fileName string) map[string]any {
	os.Remove(filepath.Join(folderPath, "geode", "mods", fileName))
	return map[string]any{"success": true}
}

/*
func (a *App) InstallMod(targetPath string, sourcePath string) map[string]any {
	dest := filepath.Join(targetPath, "geode", "mods", filepath.Base(sourcePath))
	out, _ := os.Create(dest)
	defer out.Close()
	in, _ := os.Open(sourcePath)
	defer in.Close()
	io.Copy(out, in)
	return map[string]any{"success": true}
}
*/

func (a *App) GetSingleModInfo(path string) map[string]any {
	return a.extractModInfoNative(path)
}

func (a *App) FetchModInfo(id string) map[string]any {
	resp, _ := http.Get("https://api.geode-sdk.org/v1/mods/" + id)
	if resp == nil {
		return nil
	}
	defer resp.Body.Close()
	var res map[string]any
	json.NewDecoder(resp.Body).Decode(&res)
	return res
}

func (a *App) BrowseCatalog(page int, query string, gdVersion string) ModCatalog {
	catalog := ModCatalog{Total: 0, Mods: []CatalogModInfo{}}

	var body []byte
	{
		url := fmt.Sprintf("https://api.geode-sdk.org/v1/mods?page=%d&per_page=15&status=accepted&platforms=win&gd=%s", page, gdVersion)
		if query != "" {
			url += "&query=" + query
		}

		resp, err := http.Get(url)
		if err != nil {
			return catalog
		}

		body, err = io.ReadAll(resp.Body)
		if err != nil {
			return catalog
		}

		resp.Body.Close()
	}

	var raw map[string]any
	json.Unmarshal(body, &raw)

	if payload, ok := raw["payload"].(map[string]any); ok {
		if c, ok := payload["count"].(float64); ok {
			catalog.Total = int(c)
		}

		if data, ok := payload["data"].([]any); ok {
			for _, mRaw := range data {
				m, ok := mRaw.(map[string]any)
				if !ok {
					continue
				}

				id, _ := m["id"].(string)
				downloads, _ := m["download_count"].(float64)
				featured, _ := m["featured"].(bool)

				name := id
				desc := ""
				version := "?"
				downloadLink := ""
				developer := "Unknown"

				if versions, ok := m["versions"].([]any); ok && len(versions) > 0 {
					if v0, ok := versions[0].(map[string]any); ok {
						if n, ok := v0["name"].(string); ok {
							name = n
						}
						if d, ok := v0["description"].(string); ok {
							desc = d
						}
						if ver, ok := v0["version"].(string); ok {
							version = ver
						}
						if dl, ok := v0["download_link"].(string); ok {
							downloadLink = dl
						}
					}
				}

				if devs, ok := m["developers"].([]any); ok {
					for _, devRaw := range devs {
						if dev, ok := devRaw.(map[string]any); ok {
							isOwner, _ := dev["is_owner"].(bool)
							if isOwner {
								if dName, ok := dev["display_name"].(string); ok {
									developer = dName
								}
								break
							}
						}
					}
				}

				catalog.Mods = append(catalog.Mods, CatalogModInfo{
					Id:           id,
					Name:         name,
					Desc:         desc,
					Version:      version,
					Developer:    developer,
					Downloads:    downloads,
					DownloadLink: downloadLink,
					Featured:     featured,
				})
			}
		}
	}

	return catalog
}

func (a *App) CloseWindow()    { runtime.Quit(a.ctx) }
func (a *App) MinimizeWindow() { runtime.WindowMinimise(a.ctx) }
