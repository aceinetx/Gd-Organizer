package main

import (
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type GameInstance struct {
	HasGeode bool   `json:"hasGeode"`
	Version  string `json:"version"`
	Name     string `json:"name"`
	Path     string `json:"path"`
}

type InstallProgress struct {
	Written          int64
	Total            int64
	ProgressCallback func(Written int64, Total int64)
}

func (ip *InstallProgress) Write(p []byte) (int, error) {
	n := len(p)
	ip.Written += int64(n)
	ip.ProgressCallback(ip.Written, ip.Total)
	return n, nil
}

func (a *App) InstallMod(game *GameInstance, downloadURL string, modID string) error {
	dest := filepath.Join(game.Path, "geode", "mods", modID+".geode")
	out, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer out.Close()
	resp, err := http.Get(downloadURL)

	ip := InstallProgress{}
	ip.ProgressCallback = func(Written int64, Total int64) {
		percentage := Written / Total * 100
		runtime.EventsEmit(a.ctx, "install-progress", percentage)
	}
	ip.Total = resp.ContentLength
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	io.Copy(out, io.TeeReader(resp.Body, &ip))
	return nil
}
