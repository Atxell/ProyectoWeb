pipeline {
    agent any

    triggers {
        // Cada vez que haya un commit o push en GitHub, este pipeline se ejecutará
        githubPush()
    }

    stages {
        stage('Clonar') {
            steps {
                // Clonar el repositorio
                git 'https://github.com/usuario/repo.git'
            }
        }
        stage('Construcción') {
            steps {
                // Aquí puedes poner el comando para construir tu proyecto
                echo 'Construyendo el proyecto'
            }
        }
        stage('Pruebas') {
            steps {
                // Ejecutar tus pruebas
                echo 'Ejecutando pruebas'
            }
        }
        stage('Despliegue') {
            steps {
                // Aquí va el paso de despliegue, si es necesario
                echo 'Desplegando la aplicación'
            }
        }
    }
}
