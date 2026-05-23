package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

type UserData struct {
	AccentColor string
	AccentHover string
	Theme       string
}

func NewUserData() *UserData {
	return &UserData{
		AccentColor: "#0084cc",
		AccentHover: "#0073b3",
		Theme:       "dark",
	}
}

func (a *App) getSavePath() string {
	if runtime.GOOS == "windows" {
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
		return filepath.Join(dir, "config")
	} else {
		return filepath.Join(os.Getenv("HOME"), ".gdorganizer")
	}
}

func (a *App) SaveUserData(u *UserData) {
	data, err := json.Marshal(u)
	if err != nil {
		return
	}
	path := a.getSavePath()
	os.WriteFile(path, data, 0644)
}

func (a *App) LoadUserData() *UserData {
	u := NewUserData()
	path := a.getSavePath()
	data, err := os.ReadFile(path)
	if err != nil {
		a.SaveUserData(u)
		return u
	}
	json.Unmarshal(data, u)
	return u
}
