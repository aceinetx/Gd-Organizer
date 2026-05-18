export namespace frontend {
	
	export class FileFilter {
	    DisplayName: string;
	    Pattern: string;
	
	    static createFrom(source: any = {}) {
	        return new FileFilter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.DisplayName = source["DisplayName"];
	        this.Pattern = source["Pattern"];
	    }
	}

}

export namespace main {
	
	export class CatalogModInfo {
	    Id: string;
	    Downloads: number;
	    Featured: boolean;
	    Name: string;
	    Desc: string;
	    Version: string;
	    DownloadLink: string;
	    Developer: string;
	
	    static createFrom(source: any = {}) {
	        return new CatalogModInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Downloads = source["Downloads"];
	        this.Featured = source["Featured"];
	        this.Name = source["Name"];
	        this.Desc = source["Desc"];
	        this.Version = source["Version"];
	        this.DownloadLink = source["DownloadLink"];
	        this.Developer = source["Developer"];
	    }
	}
	export class GameInstance {
	    hasGeode: boolean;
	    version: string;
	    name: string;
	    path: string;
	
	    static createFrom(source: any = {}) {
	        return new GameInstance(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hasGeode = source["hasGeode"];
	        this.version = source["version"];
	        this.name = source["name"];
	        this.path = source["path"];
	    }
	}
	export class ModCatalog {
	    Total: number;
	    Mods: CatalogModInfo[];
	
	    static createFrom(source: any = {}) {
	        return new ModCatalog(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Total = source["Total"];
	        this.Mods = this.convertValues(source["Mods"], CatalogModInfo);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ModInfo {
	    id: string;
	    name: string;
	    enabled: boolean;
	    version: string;
	    description: string;
	    file: string;
	    dependencies: string[];
	
	    static createFrom(source: any = {}) {
	        return new ModInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.enabled = source["enabled"];
	        this.version = source["version"];
	        this.description = source["description"];
	        this.file = source["file"];
	        this.dependencies = source["dependencies"];
	    }
	}

}

