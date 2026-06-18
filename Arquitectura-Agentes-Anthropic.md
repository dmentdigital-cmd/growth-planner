# Arquitectura de Agentes con Anthropic

**Referencia visual:** Cómo se estructura un agente basado en Claude para ejecutar tareas complejas.

---

## Flujo de Arquitectura

```
INPUT
  ↓
[    LLM (Claude)    ]
  ↓
OUTPUT

Herramientas disponibles para el LLM:
├─ Retrieval → Query/Results (búsqueda de información)
├─ Tools → Call/Response (ejecución de acciones)
└─ Memory → Read/Write (almacenamiento de contexto)
```

---

## Componentes Clave

### 1. Input (Entrada)
- Pregunta, instrucción o contexto del usuario
- Ejemplo: "¿Cuáles son los leads de alto valor hoy?"

### 2. LLM (Claude)
- Procesa la entrada
- Decide qué herramientas usar
- Razona sobre el problema
- Genera output

### 3. Output (Salida)
- Respuesta, recomendación o acción
- Ejemplo: "Los 5 leads principales son... por estas razones"

---

## Herramientas que El LLM Puede Usar

### Retrieval
**¿Qué hace?** Busca información en bases de datos, documentos, wikis.

**Operación:** Query → LLM busca → Results (datos relevantes)

**Ejemplo en Dmente Digital:**
- Buscar histórico de cliente
- Consultar lead scoring anterior
- Recuperar reglas de calificación

---

### Tools
**¿Qué hace?** Ejecuta acciones en sistemas externos.

**Operación:** Call → Sistema externo ejecuta → Response

**Ejemplo en Dmente Digital:**
- Crear tarea en CRM
- Enviar email a prospecto
- Actualizar estado de lead
- Llamar API de Google Cloud

---

### Memory
**¿Qué hace?** Almacena y recupera información de sesiones anteriores.

**Operación:** Read (recupera contexto) → LLM procesa → Write (guarda aprendizaje)

**Ejemplo en Dmente Digital:**
- Recordar preferencias del lead
- Registrar historial de interacciones
- Almacenar patrones de comportamiento
- Aprender de decisiones previas

---

## Casos de Uso en Dmente Digital

### 1. Agente de Calificación de Leads

```
INPUT: "Califica este lead y decide si contacarlo"
  ↓
LLM USA:
├─ Retrieval → busca histórico y scoring rules
├─ Tools → consulta datos en CRM
└─ Memory → recuerda decisiones previas
  ↓
OUTPUT: "Score 8/10, recomendar contacto inmediato, razones: [...]"
```

---

### 2. Agente de Enriquecimiento de Datos

```
INPUT: "Enriquece este lead con datos públicos"
  ↓
LLM USA:
├─ Retrieval → busca company data, industry insights
├─ Tools → llama APIs de enriquecimiento (Hunter, Clearbit)
└─ Memory → almacena patrón de enriquecimiento usado
  ↓
OUTPUT: "Lead actualizado con: industria, tamaño, presupuesto estimado, contactos"
```

---

### 3. Agente de Customer Success

```
INPUT: "¿Cómo está mi día? ¿Quién necesita urgencia?"
  ↓
LLM USA:
├─ Retrieval → busca tickets abiertos, calls programadas
├─ Tools → consulta CRM, integración de calendario
└─ Memory → recuerda clientes importantes y contexto
  ↓
OUTPUT: "3 clientes requieren atención hoy por X, Y, Z"
```

---

## Ventajas de Esta Arquitectura

✅ **Flexible:** El LLM decide qué herramientas usar según la situación
✅ **Poderoso:** Acceso a información actualizada + ejecución de acciones
✅ **Inteligente:** Memoria permite aprendizaje y mejora continua
✅ **Escalable:** Agregar nuevas herramientas sin cambiar el LLM

---

## Comparativa: Flujos vs Arquitectura de Agentes

| Aspecto | Flujos (Nodos) | Agentes (LLM) |
|---------|---|---|
| **Arquitectura** | Secuencia predeterminada | LLM decide el flujo |
| **Herramientas** | Usan herramientas fijas | Acceso flexible a múltiples herramientas |
| **Memoria** | Limitada al contexto | Memoria persistente (corto y largo plazo) |
| **Adaptabilidad** | Cambia requiere rediseño | Adapta automáticamente a nuevas situaciones |
| **Confiabilidad** | Alta (predecible) | Media (puede variar) |

---

## Guardrails Críticos para Agentes

### Límites de Herramientas
- ¿Qué herramientas puede usar el agente?
- ¿Cuáles están prohibidas?
- ¿Hay límites de permisos?

### Límites de Acción
- "No contactar si score < 5"
- "No comprometer datos sensibles"
- "Escalada a humano si confianza < 80%"

### Monitoreo
- Track de llamadas a herramientas
- Detección de alucinaciones
- Logs de decisiones

---

## Implementación Paso a Paso

### 1. Define Objetivo Claro
"Calificar y priorizar leads basado en criterios múltiples"

### 2. Especifica Herramientas Disponibles
- Retrieval: acceso a CRM, historical data
- Tools: APIs de terceros, envío de emails
- Memory: almacenamiento de decisiones

### 3. Escribe Prompts Claros
```
Eres un experto en calificación de leads de B2B SaaS.

Tienes acceso a:
1. Histórico de clientes y conversiones
2. Reglas de ICP (ideal customer profile)
3. Herramientas para búsqueda de datos

Tu tarea:
1. Analiza el lead contra estos criterios
2. Usa herramientas para enriquecer información
3. Asigna score 1-10 con razonamiento
4. Recomienda acción específica

Guardrails:
- No contactar si score < 5
- Escalada a humano si información incompleta
```

### 4. Prueba y Ajusta
- Comienza con cohorte pequeña
- Monitorea decisiones vs resultados reales
- Ajusta prompts y guardrails

---

## Relación con el Curso

**Este modelo complementa:**
- [[Flujos-Nodos-vs-Agentes-IA|Flujos con Nodos vs Agentes]] — cuándo usar cada uno
- [[Modulo-4-Framework-5-Pasos|Framework de 5 Pasos]] — ejecución de apuestas con agentes
- [[Recursos-Complementarios|Recursos Complementarios]] — referencias de Anthropic

---

## Próximo Paso

Para aplicar en Dmente Digital:
1. Identifica qué herramientas necesita tu agente
2. Define guardrails y límites
3. Escribe prompts claros
4. Prueba con cohorte pequeña

---

*Referencia: Arquitectura de Agentes con Anthropic | Curso: Growth Marketing con IA | 2026-05-25*
