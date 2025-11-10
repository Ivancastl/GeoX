# GeoX

Herramienta web para OSINT que permite generar consultas de búsqueda en X basadas en ubicación. Facilita la recolección de información de áreas específicas, filtrando por tipo de contenido y ajustando el radio de búsqueda para análisis geoespacial y monitoreo de redes sociales.

## Funcionalidades

- Mapa interactivo oscuro con marcadores y círculo de radio ajustable.  
- Búsqueda de direcciones con autocompletado.  
- Generación de consultas de búsqueda para X/Twitter por ubicación.  
- Filtrado de resultados por tipo de contenido (todos, media, imágenes, videos).

## Instalación y uso

1. Clona el repositorio:  
```bash
git clone https://github.com/Ivancastl/GeoX.git
```

2. Navega al directorio del proyecto:  
```bash
cd GeoX
```

3. Instala las dependencias del proyecto (si tu proyecto tiene `requirements.txt`):  
```bash
pip install -r requirements.txt
```

4. Ejecuta la aplicación:  
```bash
python flask_app.py
```

5. Abre el navegador en:  
```
http://127.0.0.1:5000
```