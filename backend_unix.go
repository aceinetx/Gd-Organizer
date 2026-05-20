//go:build unix

package main

import (
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func (a *App) LaunchGame(game *GameInstance) error {
	folderPath := game.Path
	exeName := "GeometryDash.exe"

	exePath := ""
	if exeName != "" {
		exePath = filepath.Join(folderPath, exeName)
		if _, err := os.Stat(exePath); os.IsNotExist(err) {
			exePath = "" // Known name is missing, fallback to search
		}
	}

	if exePath == "" {
		exePath = filepath.Join(folderPath, "GeometryDash.exe")
		if _, err := os.Stat(exePath); os.IsNotExist(err) {
			files, err := os.ReadDir(folderPath)
			if err != nil {
				return err
			}
			found := false
			for _, f := range files {
				name := f.Name()
				if !f.IsDir() && strings.HasSuffix(strings.ToLower(name), ".exe") {
					lower := strings.ToLower(name)
					if lower != "geodeupdater.exe" && !strings.HasPrefix(lower, "unins") && !strings.Contains(lower, "crash") {
						exePath = filepath.Join(folderPath, name)
						found = true
						break
					}
				}
			}
			if !found {
				return &launchError{message: "Game executable not found"}
			}
		}
	}

	wine, err := exec.LookPath("wine")
	if err != nil {
		return err
	}

	cmd := exec.Command(wine, exePath)
	cmd.Dir = folderPath
	err = cmd.Start()
	if err != nil {
		return err
	}
	return nil
}
