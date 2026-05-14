package main

import (
	"crypto/sha256"
	"encoding/hex"
	"github.com/Binject/debug/pe"
	"io"
	"log"
	"os"
)

func SHA256(file string) string {
	f, err := os.Open(file)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	h := sha256.New()
	if _, err := io.Copy(h, f); err != nil {
		log.Fatal(err)
	}
	return hex.EncodeToString(h.Sum(nil))
}

func GetGeometryDashVersion(exePath string) string {
	f, err := pe.Open(exePath)
	if err != nil {
		return ""
	}
	defer f.Close()

	version := string(f.Net.MetaData.VersionString)
	if version == "" {
		version = "2.206"

		sums := make(map[string]string)
		sums["fc5a16c292278bc2e8e078fb1d5023c2bd658322dd72712767ea70c2dd9ec6d0"] = "2.2081"
		sums["a48650af2785567749c8e5dee1433acf71ddfffc3f602a8c0e3dbcc817098131"] = "2.2074"
		sums["bf34bf193efbcd368516e657dcc44edc9612c65da32e91c617dd70cb0009c563"] = "2.206"
		val, ok := sums[SHA256(exePath)]
		if ok {
			version = val
		}
	}

	version = "2.206"
	return version
}
