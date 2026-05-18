package main

type ModInfo struct {
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	Enabled      bool     `json:"enabled"`
	Version      string   `json:"version"`
	Description  string   `json:"description"`
	File         string   `json:"file"`
	Dependencies []string `json:"dependencies"`
}
