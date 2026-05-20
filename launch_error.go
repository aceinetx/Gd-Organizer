package main

import "fmt"

type launchError struct {
	message string
}

func (e *launchError) Error() string {
	return fmt.Sprintf("%s", e.message)
}
