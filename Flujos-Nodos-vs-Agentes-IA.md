# Flujos con Nodos vs Agentes con LLM: Cuándo Usar Cada Uno

**Objetivo:** Entender cuándo usar flujos deterministas y cuándo usar agentes autónomos. Cada uno tiene tradeoffs diferentes.

---

## Regla de Oro

Para la **mayoría de roles**:

> **Empezar con flujos deterministas con nodos ofrece más control del output.**
> **Los agentes son más flexibles y autónomos, pero agregan incertidumbre técnica y de resultados.**

---

## Flujos Automatizados con Nodos (Determinísticos)

### ¿Qué son?
Secuencias de pasos **predeterminados** donde cada nodo cumple una función específica y el flujo es **controlado y predecible**.

### Componentes de un Flujo

#### 1. Disparador (Trigger)
- **Automático por condición:** cuando ocurre evento X (ej: nuevo usuario, abandono carrito)
- **Manual:** usuario hace clic en botón
- **Por tiempo:** recurrente (diarios, semanales)
- **Por API/Webhook:** sistema externo dispara el flujo

**Importancia:** Identificar el **momento clave** que dispara la automatización.

**Ejemplos:**
- Usuario completa signup → disparador de onboarding
- Usuario abandona carrito hace 2 horas → disparador de email
- Cada lunes a las 8am → disparador de reporte semanal

#### 2. Acciones (Nodos)
Son los **pasos específicos** que ejecuta el flujo.

| Tipo de Nodo | Qué Hace | Ejemplo |
|--------------|----------|---------|
| **LLM** | Procesa texto, genera contenido, clasifica | Generar email personalizado, clasificar feedback |
| **Data** | Busca, actualiza, valida información | Query a base de datos, enriquece user data |
| **Integración** | Habla con herramientas externas | Envía Slack, actualiza CRM, pide info a API |
| **Lógica** | Condicionales, iteraciones, transformaciones | "Si score > 8, ir a rama A; si no, rama B" |

**Creatividad:** Está en entender cómo se **relacionan los elementos** entre sí.

**Ejemplo flujo:**
```
1. Trigger: Usuario abandona carrito
   ↓
2. Data: Busca histórico de ese usuario
   ↓
3. LLM: Genera email personalizado con oferta
   ↓
4. Lógica: Si score de probabilidad compra > 7, envía email
   ↓
5. Integración: Envía email vía SendGrid
   ↓
6. Data: Registra acción en CRM
```

#### 3. Resultado (Output)
Define **exactamente qué debe ocurrir** al final:

| Resultado | Descripción |
|-----------|-------------|
| **Actualización de base/sistema** | Marca usuario como "contacted", update CRM |
| **Notificación** | Envía email, Slack, SMS |
| **Llamada al cliente** | Dispara llamada automática, reserva meeting |
| **Cambio de estado** | Mueve usuario a siguiente etapa |

---

### Herramientas para Construir Flujos

Las plataformas **low-code/no-code** más usadas:

| Herramienta | Fortaleza | Curva Aprendizaje | Precio |
|------------|-----------|------------------|--------|
| **Zapier** | Más integraciones (5000+), interfaz amigable | Baja | Medio |
| **N8N** | Open source, flexible, hospedaje propio | Media | Bajo/Medio |
| **Relay** | Agnóstico de plataforma, node-based | Media | Medio |
| **Make** | Visual, fuerte en orquestación | Baja | Medio |

---

### Ventajas de Flujos Determinísticos

✅ **Control total:** sabes exactamente qué pasa en cada paso
✅ **Predecibilidad:** mismos inputs = mismo output
✅ **Debugging fácil:** si algo falla, sabes dónde
✅ **Compliance:** auditoría clara de decisiones
✅ **Guardrails simples:** limites claros de acción
✅ **Rápido de construir:** no requiere mucha data histórica
✅ **Costo bajo:** herramientas low-code son baratas

---

### Limitaciones

❌ **Poco flexible:** requiere cambios manuales si quieres variar flujo
❌ **Escalabilidad limitada:** si necesitas 100 variaciones, 100 flujos
❌ **Requiere lógica predefinida:** alguien debe decidir todas las ramas
❌ **No aprende:** el flujo es estático

---

## Agentes con LLM (Autónomos)

### ¿Qué son?
Un **LLM que puede usar herramientas**, **tomar decisiones** y **actuar de forma autónoma** para lograr un objetivo.

### Cómo Funciona un Agente

#### 1. Objetivo y Entrada Abierta
El usuario da una **instrucción general** (no un flujo específico).

**Ejemplos:**
- "¿Cómo es mi día de hoy?" → agente consulta calendario, emails, tareas
- "Califica estos 50 leads y prioriza los mejores" → agente usa datos, modelo de scoring, toma decisiones
- "Activa campañas según el comportamiento del usuario" → agente decide qué campañas, para quién, cuándo

#### 2. Orquestación del LLM
El LLM hace un **razonamiento** y **decide qué herramientas usar**.

```
Entrada: "¿Cómo es mi día?"
   ↓
LLM razona: "Necesito:
  - Chequear calendario
  - Ver emails críticos
  - Revisar tareas prioritarias"
   ↓
LLM ejecuta:
  - Consulta API de calendario
  - Busca emails con palabras clave críticas
  - Query a base de tareas
   ↓
LLM integra información y responde:
  "Tienes 2 reuniones críticas, 3 emails urgentes..."
```

#### 3. Memoria
- **Corto plazo:** contexto de la conversación actual
- **Largo plazo:** aprendizajes y preferencias previas
- **Contexto:** información de sistemas externos

#### 4. Entrega de Resultado
Combina búsquedas, herramientas y memoria para responder o actuar.

---

### Ventajas de Agentes

✅ **Flexible:** mismo agente maneja 100 variaciones
✅ **Aprende:** puede mejorar con feedback
✅ **Autónomo:** toma decisiones sin intervención
✅ **Conversacional:** interacción más natural
✅ **Escalable:** un agente replaces múltiples flujos

---

### Limitaciones y Riesgos

❌ **Alucinaciones:** LLM inventa información que no tiene
❌ **Incertidumbre:** output puede variar con mismos inputs
❌ **Compliance difícil:** decisiones pueden ser opacas
❌ **Requiere guardrails:** límites de acción muy específicos
❌ **Testing complejo:** difícil predecir edge cases
❌ **Más caro:** llamadas a API de LLM suman

---

## Matriz de Decisión: Flujo vs Agente

### Usa Flujos Determinísticos Cuando

✅ Lógica es **clara y predefinida**
✅ Quieres **máximo control** del output
✅ Necesitas **compliance/auditoría** estricta
✅ El caso de uso es **repetitivo y estable**
✅ Presupuesto es **limitado**
✅ Exactitud es **crítica** (no toleras errores)

**Ejemplos:**
- Enviar email a usuarios que abandonaron carrito
- Procesar pagos automáticos
- Actualizar registros en CRM con eventos
- Generar reportes diarios automatizados

---

### Usa Agentes Cuando

✅ Lógica es **compleja o incierta**
✅ Necesitas **flexibilidad y adaptación**
✅ Puedes tolerar **cierto margen de error**
✅ El output requiere **razonamiento**
✅ Casos de uso son **variados**
✅ Hay valor en **aprender y mejorar**

**Ejemplos:**
- Asistente de customer success que responde emails variados
- Calificación inteligente de leads con múltiples criterios
- Recomendador que adapta sugerencias a contexto
- Analista de feedback que extrae insights

---

## Composición: Flujos + Agentes Juntos

La mayoría de soluciones combinan ambos:

```
Flujo determinístico (disparador)
   ↓
Agente (decide qué hacer)
   ↓
Flujos determinísticos (ejecuta acciones)
```

**Ejemplo:**
1. **Flujo:** Nuevo lead entra al sistema (trigger)
2. **Agente:** Analiza perfil, compite con ICP, decide prioridad
3. **Flujos:** Envía email específico, agenda meeting, notifica sales

---

## Guardrails Críticos para Agentes

### Límites de Acción
- "No tomar decisión si confianza < 80%"
- "No comprometer recursos > $1000"
- "No contactar cliente si score < 5"

### Escalada a Humano
- Decisiones de alto riesgo → revisión humana
- Conflictos de información → escalada
- Output anómalo → alerta

### Monitoreo
- Track alucinaciones
- Monitor de accuracy
- Feedback loop para reentrenamiento

---

## Próximo Paso
→ [[Recursos-Practicos|Recursos Prácticos: Plantillas y Herramientas]]

---

*Curso: Growth Marketing con Inteligencia Artificial | 2026-05-25*
