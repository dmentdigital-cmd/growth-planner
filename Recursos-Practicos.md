# Recursos Prácticos: Plantillas y Herramientas

**Objetivo:** Acceso directo a plantillas, prompts y herramientas probadas para activar de inmediato.

---

## Plantillas Disponibles

### 1. Plantilla de Priorización de Apuestas

**Descripción:** Framework para evaluar e-on documentar apuestas de crecimiento.

**Incluye:**
- Canvas de 5 pasos (Insights → Palanca → Apetito → Riesgos → Ejecución)
- Matriz de probabilidad vs. impacto
- Timeline y hitos
- Asignación de recursos

**Cómo Usar:**
1. Copia la plantilla a tu workspace (Google Docs, Notion, etc.)
2. Personaliza para tu contexto
3. Comparte con equipo
4. Revisa trimestralmente

**Acceso:** Encontrarás link en la sección de recursos descargables del curso.

---

### 2. Plantilla de Documentación de Aprendizajes

**Descripción:** Registro estructurado de hipótesis, resultados y decisiones.

**Incluye:**
- Hipótesis inicial
- Plan de validación
- Resultados reales
- Insights ganados
- Siguiente apuesta

**Por Qué Importa:**
- Evita repetir errores
- Escala lo que funciona
- Crea memoria organizacional
- Facilita toma de decisiones futuras

**Formato:** Markdown (copiar a Obsidian directamente)

---

### 3. Plantilla de Flujo Automatizado

**Descripción:** Canvas para diseñar flujos con nodos antes de construir.

**Incluye:**
- Disparador (trigger)
- Secuencia de nodos
- Condiciones lógicas
- Resultado esperado
- Métricas de éxito

**Herramienta:** Diagrama visual en Figma (editable)

---

### 4. Plantilla de Especificación de Agente

**Descripción:** Define objetivo, entrada, herramientas, guardrails del agente.

**Incluye:**
- Objetivo principal
- Entrada esperada (ejemplos)
- Herramientas disponibles
- Guardrails y límites
- Escalada a humano
- Monitoreo y éxito

---

## Prompts Probados para Casos Comunes

### Prompt: Generación de Leads con Scoring

```
Eres un asistente que califica leads de B2B SaaS.

Tienes acceso a:
- Datos del lead (company, size, industry, behavior)
- ICP definido (ideal customer profile)
- Histórico de conversión

Tu tarea:
1. Compara lead contra ICP
2. Asigna score de 1-10
3. Da razones específicas (2-3 puntos)
4. Recomienda acción (nurture, call, disqualify)

Formato salida:
Score: [1-10]
Razones: [lista]
Acción recomendada: [específica]
```

### Prompt: Análisis de Feedback de Clientes

```
Analiza este feedback de cliente y extrae insights.

Para cada feedback:
1. Problema identificado
2. Severidad (1-5)
3. Categoría (UX, producto, precio, soporte, otra)
4. Patrón (¿otros lo mencionan?)
5. Oportunidad de crecimiento (si aplica)

Sé conciso y accionable.
```

### Prompt: Generación de Variantes Creativas

```
Genera 3 variantes de este email/copy para A/B testing.

Original:
[insert email]

Variantes:
- Var 1: Enfoque emocional (apelar a aspiración)
- Var 2: Enfoque racional (beneficios tangibles)
- Var 3: Enfoque urgencia (tiempo limitado)

Mantén tono, longitud similar, call-to-action claro.
```

---

## Glosario de Automatizaciones

### Automatizaciones Comunes en Growth

| Automatización | Descripción | Herramienta | Complejidad |
|---|---|---|---|
| **Email secuencial** | Envía emails según timeline a usuarios nuevos | Zapier, HubSpot, Klaviyo | Baja |
| **Scoring de leads** | Asigna puntos según comportamiento/firmografía | N8N, Make, interno | Media |
| **Enriquecimiento de datos** | Agrega info externa a perfil de lead | Zapier, Apollo, Clay | Baja |
| **Segmentación dinámica** | Mueve usuarios entre segmentos automáticamente | Segment, Klaviyo | Media |
| **Reporte diario** | Compila métricas, genera reporte, envía | Zapier, Data Studio | Baja |
| **Captura de feedback** | Forma → Análisis → Insights automático | Typeform + N8N | Media |
| **Notificación de evento** | Slack/email cuando ocurre evento clave | Zapier | Baja |
| **Follow-up automático** | Escalada si no hay respuesta | Pipedrive, internal | Media |
| **Generación de contenido** | Templates + data → contenido personalizado | N8N, Make | Media-Alta |

---

## Stack Recomendado por Etapa

### Startup Early Stage
- **Captura:** Typeform o Google Forms
- **Orquestación:** Zapier
- **Email:** Mailchimp
- **CRM:** HubSpot Free
- **Analytics:** Google Analytics
- **Total costo:** $50-200/mes

### Growth Stage
- **Captura:** Typeform
- **Orquestación:** N8N (self-hosted) o Make
- **Email:** SendGrid o Klaviyo
- **CRM:** HubSpot Pro o Pipedrive
- **Analytics:** Segment + custom data warehouse
- **LLM:** Claude API, OpenAI
- **Total costo:** $500-2000/mes

### Scale Stage
- **Captura:** Custom (app)
- **Orquestación:** N8N (self-hosted) + custom development
- **Email:** Custom (en casa)
- **CRM:** Salesforce o HubSpot Enterprise
- **Analytics:** Data warehouse (Snowflake, BigQuery) + BI tool (Looker, Tableau)
- **LLM:** Multiple (OpenAI, Claude, fine-tuned models)
- **Total costo:** $5000+/mes

---

## Evaluación de Herramientas: Checklist

### ¿Es la herramienta adecuada para tu caso?

- [ ] **Costo:** ¿Entra en presupuesto? ¿ROI claro en 3 meses?
- [ ] **Integración:** ¿Se conecta con tu stack actual?
- [ ] **Escalabilidad:** ¿Puede crecer con tu empresa?
- [ ] **Documentación:** ¿Hay recursos para aprender?
- [ ] **Comunidad:** ¿Hay help disponible?
- [ ] **Support:** ¿Qué SLA ofrece?
- [ ] **Security:** ¿Cumple compliance needs?
- [ ] **Alternativas:** ¿Hay opciones mejores?

---

## Sección de Diseño: Hoja de Ruta

### Primera Apuesta: Quick Win (Semanas 1-4)

**Objetivo:** Validar metodología con bajo riesgo.

**Paso 1: Selecciona** flujo automatizado simple (email sequence, scoring básico)
**Paso 2: Diseña** usando plantilla de flujo
**Paso 3: Construye** con herramienta low-code (Zapier, Make)
**Paso 4: Lanza** en cohorte pequeña (100 usuarios)
**Paso 5: Documenta** aprendizajes

**KPI de éxito:** 20%+ mejora en métrica base

---

### Segunda Apuesta: Prueba (Semanas 5-12)

**Objetivo:** Explorar modelo o canal nuevo.

**Paso 1: Define** hipótesis clara con equipo
**Paso 2: Diseña** agente o flujo complejo
**Paso 3: Valida** con 500+ usuarios
**Paso 4: Analiza** resultados vs. hipótesis
**Paso 5: Decide** pivot, iterate, o escala

**KPI de éxito:** Validación clara de tesis (sí o no)

---

### Tercera Apuesta: Largo Plazo (Meses 3+)

**Objetivo:** Construir diferencial defensible.

**Paso 1: Visión** clara de qué habilitamos
**Paso 2: Roadmap** trimestral
**Paso 3: Squad** dedicado
**Paso 4: Milestones** medibles
**Paso 5: Iteración** contínua

---

## Cómo Copiar la Plantilla y Empezar

1. **Accede** a la plantilla (Google Drive link o Notion)
2. **Haz una copia** a tu workspace personal
3. **Personaliza** nombre, contexto, equipo
4. **Comparte** con tu equipo
5. **Llena primera apuesta** (selecciona de tu backlog)
6. **Documenta aprendizajes** en siguiente plantilla
7. **Repite** para siguiente apuesta

---

## Preguntas Frecuentes

### ¿Por dónde empiezo si no tengo nada?

1. Identifica **un problema claro** en tu funnel
2. Selecciona **quick win** con impacto medible
3. Usa **plantilla de priorización** para evaluarlo
4. **Construye con Zapier** en una semana
5. **Lanza a cohorte pequeña** y mide

### ¿Cuánto debe costar la primera apuesta?

Entre **$500-5000** totales (herramientas + personas).

Si es más caro, es probable que **no sea un quick win** sino una prueba o apuesta LP.

### ¿Cuándo escalo?

Cuando ves **consistencia en resultados** (misma mejora en 2+ cohortes).

### ¿Dónde obtengo ayuda si algo falla?

1. **Documentación:** Lee docs de herramienta
2. **Comunidad:** Busca en Reddit, Discord
3. **Consultor:** Contrata especialista por horas
4. **Cursos:** Bootcamp específico de herramienta

---

## Próximo Paso

¿Tienes dudas sobre cómo aplicar el framework o elegir entre flujos y agentes?

**Comparte tu contexto:**
- Qué problema intentas resolver
- Recursos disponibles
- Timeline esperado

---

*Curso: Growth Marketing con Inteligencia Artificial | 2026-05-25*
