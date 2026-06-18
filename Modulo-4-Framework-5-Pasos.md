# Módulo 4: Framework de 5 Pasos para Apuestas de Crecimiento con IA

**Objetivo:** Pasar del experimento disperso a resultados de negocio mediante un framework práctico y sistemático.

---

## El Problema Actual

- **IA ya está en manos del 90% de empleados**
- **Pero solo el 5% de iniciativas llega a producción**
- Falta integración, know-how y apuestas demasiado incrementales

---

## Solución: Framework de 5 Pasos

Un método práctico que combina **visión estratégica + pensamiento sistémico + ejecución paso a paso**.

---

## Paso 1: Insights Ganados y Punto de Vista

### ¿Qué es?
- Detectar **qué ves tú que otros no ven**
- Usa **data de clientes** para identificar patrones
- Encuentra **oportunidades no resueltas**

### Preguntas Clave
- ¿Qué comportamientos de clientes se repiten?
- ¿Dónde hay fricción en el funnel?
- ¿Qué problema resuelven tus mejores clientes pero otros no?
- ¿Qué señales de abandono ves temprano?

### Cómo Hacerlo
1. **Analiza data:** comportamiento de usuarios, feedback, churn
2. **Busca patrones:** qué tipologías de usuarios sufren qué problemas
3. **Valida hipótesis:** habla con clientes, confirma que el problema existe
4. **Define tu punto de vista:** "Hemos notado que el 40% de usuarios abandonan sin completar X"

### Salida
Un **insight accionable** que se convierte en apuesta de crecimiento

---

## Paso 2: Palanca de Crecimiento

### ¿Qué es?
Define **dónde impactas** dentro del flywheel de crecimiento:

| Palanca | Descripción | Ejemplo |
|---------|-------------|---------|
| **Adquisición** | Traer nuevos usuarios | Mejorar ranking de búsqueda, activar nuevo canal |
| **Retención** | Que clientes sigan activos | Onboarding mejor, features más relevantes |
| **Monetización** | Extraer más valor por usuario | Upsell, cross-sell, new pricing |
| **Feedback Loops** | Acelerar lo que ya funciona | Growth loops, referrals, efectos de red |

### ¿Por Qué Importa?
- Cada palanca tiene **diferentes métricas de éxito**
- Diferente **ciclo de ejecución** (adquisición es más lenta que retención)
- Diferente **complejidad técnica**

### Cómo Elegir
- Empieza donde **tienes más certidumbre**
- Prioriza **retención sobre adquisición** si la base es pequeña
- Usa **feedback loops** para multiplicar el efecto

---

## Paso 3: Apetito

### ¿Qué es?
Cruzar **potencial de resultados** con **recursos y ejecución disponibles**.

### Matriz de Apetito

```
Potencial Alto + Recursos Altos = Apuesta Grande (strategic bet)
Potencial Alto + Recursos Bajos = Experimento Rápido (quick validation)
Potencial Bajo + Recursos Bajos = Quick Win (siempre sí)
Potencial Bajo + Recursos Altos = No Hacer (waste of resources)
```

### Cómo Decidir
1. **Estima potencial:** ¿cuál es el upside en 6 meses? (% mejora en métrica clave)
2. **Calcula recursos:** personas, días, datos, herramientas necesarias
3. **Define "éxito mínimo":** ¿qué número te hace escalar?
4. **Construye MVP:** primera versión para validar sin apuesta desproporcionada

### Regla de Oro
> Construye una **primera versión pequeña** para validar, antes de comprometer recursos grandes.

---

## Paso 4: Restricciones y Riesgos

### ¿Qué NO entra en la primera versión?
- Identifica **qué está fuera de scope**
- Previene **rabbit holes** que derivan los planes

### Ejercicio de Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|-----------|
| Alucinaciones del LLM | Media | Alto | Guardrails, validación manual, fallback |
| Data incompleta | Baja | Medio | Enriquecimiento previo, fill rules |
| Integración con sistemas legacy | Alta | Medio | API wrapper, testing en staging |
| Precisión insuficiente | Media | Alto | A/B test, monitoreo, umbrales |

### Cómo Prevenir Desvíos
1. **Aclara límites desde temprano:** "esta apuesta NO incluye..."
2. **Identifica qué podría salir mal:** lista de riesgos reales
3. **Define guardrails:** límites de acción automática (ej: "no tomar acción si confianza < 80%")
4. **Protocolo de escalada:** cuándo interviene humano

---

## Paso 5: Ejecución

### ¿Qué define la ejecución?

#### Clasificación Tiempo y Riesgo
1. **Quick Win** (0-4 semanas, bajo riesgo)
   - Ya tienes infraestructura
   - Validación clara y rápida
   - Recursos mínimos
   - Ejemplo: mejorar email existente con personalización IA

2. **Apuesta de Largo Plazo** (3-12 meses, riesgo medio-alto)
   - Requiere nueva infraestructura
   - Validación iterativa
   - Inversión significativa en personas/tools
   - Ejemplo: construir growth loop con efectos de red

#### Plan de Ejecución
Define para cada apuesta:

| Dimensión | Detalles |
|-----------|----------|
| **Personas** | Quién lidera, qué skills necesitas, gaps |
| **Tiempo** | Timeline, hitos, deadline |
| **Aliados** | Equipos dependientes, stakeholders clave |
| **Herramientas** | Stack de tecnología, APIs, plataformas |
| **Datos** | Qué datos necesitas, dónde están, cómo enriqueces |

### Hito 0: Setup (1 semana)
- Equipo alineado
- Acceso a datos y herramientas
- Ambiente de development listo
- Primera prueba de concepto

### Hito 1: MVP (2-4 semanas)
- Solución mínima en producción
- Métricas iniciales medidas
- Documentación de aprendizajes

### Hito 2: Validación (4-8 semanas)
- Suficiente data para decisión
- Análisis de resultados
- Decisión: iterar, pivotar, escalar

---

## Regla del Pulgar: Dónde Mover la Aguja

### La Proximidad Es Clave
> **Entre más cerca estés de la conversión o activación, más rápido moverás la aguja.**

### Factores a Considerar
- **Tamaño empresa:** ¿cuántos usuarios impactables tienes?
- **Madurez empresa:** ¿cuánta data tienes para tomar decisiones?
- **Base de usuarios:** ¿qué % del funnel tocas?
- **Momentos críticos:** ¿dónde se toman decisiones de compra/activación?

### Ejemplo Jerarquía de Impacto
1. **Más impacto (cercano a conversión):** Mejorar email de oferta final
2. **Medio impacto:** Mejorar onboarding de nuevos usuarios
3. **Menos impacto (lejano a conversión):** Mejorar contenido awareness

---

## Próximo Paso
→ [[Clasificacion-Iniciativas|Clasificación de Iniciativas: Always On, Pruebas, Apuestas Largo Plazo]]

---

*Curso: Growth Marketing con Inteligencia Artificial | 2026-05-25*
