import { createStackNavigator } from '@react-navigation/stack';
import ContratoListScreen from '../modules/contratos/screens/ContratoListScreen';
import DetalleContratoScreen from '../modules/contratos/screens/DetalleContratoScreen';
import RenovacionesScreen from '../modules/contratos/screens/RenovacionesScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contratos" component={ContratoListScreen} />
      <Stack.Screen name="DetalleContrato" component={DetalleContratoScreen} />
      <Stack.Screen name="Renovaciones" component={RenovacionesScreen} />
    </Stack.Navigator>
  );
}