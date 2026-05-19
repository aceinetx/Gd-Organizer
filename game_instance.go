package main

import (
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

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

	lastNotify time.Time
}

func (ip *InstallProgress) Write(p []byte) (int, error) {
	n := len(p)
	ip.Written += int64(n)

	now := time.Now()
	shouldNotify := false

	if ip.lastNotify.IsZero() || now.Sub(ip.lastNotify) >= time.Second {
		shouldNotify = true
		ip.lastNotify = now
	}

	if ip.Written == ip.Total {
		shouldNotify = true
		ip.lastNotify = now
	}

	if shouldNotify && ip.ProgressCallback != nil {
		ip.ProgressCallback(ip.Written, ip.Total)
	}

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
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	ip := InstallProgress{}
	ip.ProgressCallback = func(Written int64, Total int64) {
		percentage := float64(Written) / float64(Total) * 100
		runtime.EventsEmit(a.ctx, "install-progress", percentage)
	}
	ip.Total = resp.ContentLength

	_, err = io.Copy(out, io.TeeReader(resp.Body, &ip))
	if err != nil {
		return err
	}

	if ip.ProgressCallback != nil {
		ip.ProgressCallback(ip.Written, ip.Total)
	}

	return nil
}
