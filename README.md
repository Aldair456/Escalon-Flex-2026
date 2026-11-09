# Escalón Flex

**Escalón Flex** es una propuesta de producto construida sobre la app de **Yape**, pensada para las personas que hoy no pueden acceder a un crédito porque no tienen historial crediticio.

En vez de rechazarlas sin más, Escalón Flex las ayuda a **construir ese historial desde cero**: eligen una meta de ahorro, se comprometen a aportes pequeños y constantes, y van subiendo de nivel (Inicial → En construcción → Sólido → Listo para tu crédito) a medida que cumplen. Con ese comportamiento de ahorro, Yape puede evaluarlas y ofrecerles un microcrédito real más adelante — sin necesidad de historial bancario previo.

## ¿Qué incluye el prototipo?

- **Onboarding de meta de ahorro**: el usuario elige para qué quiere ahorrar (emergencias, un proyecto personal, un negocio) y para qué usaría el crédito.
- **Consentimiento de datos**: pantalla clara de qué datos se usan y para qué, alineada a la Ley N° 29733.
- **Plan de ahorro personalizado**: monto, frecuencia y fecha de aportes, con calendario de pagos.
- **Nivel Escalón**: progreso visual por niveles según la constancia de ahorro, con racha (streak) y FAQ.
- **Análisis de perfil con IA**: evaluación de hábitos de ahorro para saber si el usuario ya califica para un microcrédito.
- **Simulador de crédito**: simula monto, plazo, tasa (TEA) y TCEA con cifras referenciales ajustadas a datos reales reportados de préstamos Yape.
- **Simulador de escenarios**: qué pasa con el plan de ahorro si bajan los ingresos.
- **Confirmación y comprobante de pago**, notificaciones y recordatorios.

## Estructura del proyecto

```
.
├── frontend/   # App móvil (Expo + React Native + Expo Router)
└── backend/    # Servicios (Python, arquitectura serverless)
```

### Frontend

- **Stack**: Expo, React Native, Expo Router, TypeScript.
- Cada pantalla vive en `frontend/src/app/` (ruteo por archivos).
- Componentes reutilizables organizados por feature en `frontend/src/components/`.

Para correrlo:

```bash
cd frontend
npm install
npm run start
```

### Backend

- **Stack**: Python, arquitectura serverless (Lambda-style), patrón repositorio.
- Servicio de usuarios en `backend/services/users/`.

## Screenshots

_(próximamente)_
