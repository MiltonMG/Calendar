//NOTA:
/* 
Se recomienda entonces, ubicar la exportación del store 
hasta el final de todo, en nuestro archivo de barril, 
pues es a través de el store que hacemos el llamado de 
los diferentes reducers, y para ese momento ya deben de 
estar correctamente inicializados.

De esta forma da error:

export * from './store';
export * from './ui/uiSlice';


De esta forma NO da error:

export * from './ui/uiSlice';
export * from './store';

*/

export * from './ui/uiSlice';
export * from './calendar/calendarSlice';


export * from './store';