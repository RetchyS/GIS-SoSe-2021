namespace Tischpflanze {

    export interface Pflanze {
        
        pflanzen: string;
  
    
    } 
    
    export interface Topf {
    
        skincolor: string;
        körperlänge: number;
    
    
    }
    
    
    export interface Tisch {
        skincolor: string;
        anzahlfüße: number;
        fußlänge: number;
    
    }
    
    export interface PflanzemitTisch {
        füße: Pflanze;
        körper: Topf;
        kopf: Tisch;
    
    }
    
    }