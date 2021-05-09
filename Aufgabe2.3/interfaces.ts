namespace Chimera {

    export interface Kopf {
        _radius: number;
        _haircolor: string;
  
    
    } 
    
    export interface Körper {
    
        _skincolor: string;
        _körperlänge: number;
    
    
    }
    
    
    export interface Füße {
        _skincolor: string;
        _anzahlfüße: number;
        _fußlänge: number;
    
    }
    
    export interface Chimerading {
        _füße: Füße;
        _körper: Körper;
        _kopf: Kopf;
    
    }
    
    }