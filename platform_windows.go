//go:build windows

package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"syscall"
)

func CreateDesktopShortcut() {
	exePath, err := os.Executable()
	if err != nil {
		return
	}

	desktopPath := filepath.Join(os.Getenv("USERPROFILE"), "Desktop", "GD Organizer.lnk")

	if _, err := os.Stat(desktopPath); os.IsNotExist(err) {
		psScript := fmt.Sprintf(`$s=(New-Object -COM WScript.Shell).CreateShortcut('%s'); $s.TargetPath='%s'; $s.IconLocation='%s, 0'; $s.Save()`, desktopPath, exePath, exePath)
		cmd := exec.Command("powershell", "-NoProfile", "-Command", psScript)
		cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		_ = cmd.Run()
	}
}

func LaunchGame(folderPath string) {
	exePath := filepath.Join(folderPath, "GeometryDash.exe")
	cmd := exec.Command(exePath)
	cmd.Dir = folderPath
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	cmd.Start()
}
