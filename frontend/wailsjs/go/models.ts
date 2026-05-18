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

