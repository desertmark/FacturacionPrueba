import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CounterStore from '../store/Counter';
import * as WeatherForecasts from '../store/WeatherForecasts';

type CounterProps =
    CounterStore.CounterState
    & typeof CounterStore.actionCreators
    & RouteComponentProps<{}>;

class Counter extends React.Component<CounterProps, {}> {
    public render() {
        return <div>
            <h1>Facturacion</h1>

            <p>Prueba de facturacion con PDFMake</p>

            <button onClick={() => alert('Imprimiendo Facturas')}>Imprimir Facturas</button>
        </div>;
    }
}


export default connect(
    (state: ApplicationState) => state.counter, 
    CounterStore.actionCreators                 
)(Counter) as typeof Counter;