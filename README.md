# Construir las imagemes del backend y del frontend

Para constuir la imagen del backend corremos:

```
docker build -t ricardogeek/games-backend .
```

Para construir la imagen del frontend corremos:

```
docker build -t ricardogeek/games-frontend .
```

Luego creamos los tags correspondientes

Tag del backend
```
docker tag ricardogeek/games-backend:latest ricardogeek/games-backend:0.1.0
```

Tag del frontend
```
docker tag ricardogeek/games-frontend:latest ricardogeek/games-frontend:0.1.0
```

cuando esta echo el tag le damos push a las imagenes

Push al backend
```
docker push ricardogeek/games-backend:0.1.0
```

Push al frontend
```
docker push ricardogeek/games-frontend:0.1.0
```

# Deployment

Para los deployments de k8s

en cada directoreio backend/frontend correr:

```
kubectl apply -f deployment.yml
```

Exponemos el servicio para cada uno

Frontend
```
kubectl expose deployment testdeploy --type=LoadBalancer --name=games-frontend
```


Backend
```
kubectl expose deployment testdeploy --type=LoadBalancer --name=games-backend
```

Para obtener las IPs de los servicios:

```
kubectl get service
```

ENJOY  (っ＾▿＾)۶🍸🌟🍺٩(˘◡˘ )

- https://hub.docker.com/r/ricardogeek/games-frontend
- https://hub.docker.com/r/ricardogeek/games-backend