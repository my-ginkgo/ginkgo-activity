class KalmanFilter {
    private x: number;  // Posizione attuale
    private P: number;  // Covarianza dell'errore di stima
    private Q: number;  // Covarianza del rumore di processo
    private R: number;  // Covarianza del rumore di misura
    private A: number;  // Matrice di transizione del modello dinamico
    private H: number;  // Matrice di osservazione

    // Inizializza il filtro con i parametri del modello dinamico dell'oggetto e le matrici di covarianza
    constructor(x0: number, P0: number, Q: number, R: number, A: number, H: number) {
        this.x = x0;
        this.P = P0;
        this.Q = Q;
        this.R = R;
        this.A = A;
        this.H = H;
    }

    // Aggiorna il filtro con una nuova misura di stato
    public update(z: number): void {
        // Predizione dello stato
        this.x = this.A * this.x;
        this.P = this.A * this.P * this.A + this.Q;

        // Aggiornamento dello stato
        const K = this.H * this.P * this.H + this.R;
        this.x = this.x + K * (z - this.H * this.x);
        this.P = (1 - K * this.H) * this.P;
    }

    // Restituisce la stima attuale delle variabili di stato
    public getState(): number {
        return this.x;
    }
}

export const testKaimanFilter = () => {
// Crea un nuovo filtro di Kalman con i parametri iniziali
    const filter = new KalmanFilter(0, 1, 0.1, 1, 1, 1);

// Aggiorna il filtro con una nuova misura di stato
    filter.update(1);

// Stampa la stima attuale delle variabili di stato
    console.log(filter.getState());
};


export const angularAcceleration = (x: number, y: number, z: number): number => {
    return Math.sqrt(x * x + y * y + z * z) - 9.81;
};

export const angularVelocity = (angularAccelerations: { x: number, y: number, z: number, time: number }[]): number => {
    let angularVelocity: number = 0;
    for (const m of angularAccelerations) {
        angularVelocity = angularAcceleration(m.x, m.y, m.z) * m.time + angularVelocity;
    }
    return angularVelocity;
};

export const linearVelocity = (distance1: number, distance2: number, time1: number, time2: number): number => {
    return (distance2 - distance1) / (time2 - time1);
};

export const linearAcceleration = (linearVelocity1: number, linearVelocity2: number, time1: number, time2: number): number => {
    return (linearVelocity2 - linearVelocity1) / (time2 - time1);
};

export const kineticEnergy = (mass: number, linearVelocity: number): number => {
    return (1 / 2) * mass * linearVelocity ** 2;
};

export const centripetalForce = (mass: number, linearVelocity: number, radius: number): number => {
    return mass * linearVelocity ** 2 / radius;
};
