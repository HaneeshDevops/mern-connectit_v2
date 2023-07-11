pipeline {
    agent any
    
    stages {
        stage('clone') {
            steps {
                git 'https://github.com/HaneeshDevops/mern-connectit_v2.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker network create connectit'
                sh 'docker volume create connectit'
                sh 'cd client && docker build --no-cache -t haneeshdevops/client . && cd ..'
                sh 'cd server && docker build --no-cache -t haneeshdevops/server . && cd ..'
            }
        }

        stage('Push') {
            steps {
                sh 'docker login -u haneeshdevops -p intMega@95422'
                sh 'docker push haneeshdevops/client:latest'
                sh 'docker push haneeshdevops/server:latest'
            }
        }
        
        stage('k8s') {
            steps {
                withKubeConfig([credentialsId: 'k8sgroup']) {
                    sh 'kubectl apply -f client-deployment.yml'
                    sh 'kubectl apply -f client-service.yml'
                    sh 'kubectl apply -f server-deployment.yml'
                    sh 'kubectl apply -f server-service.yml'
                    sh 'kubectl rollout restart deployment client'
                    sh 'kubectl rollout restart deployment server'
                }
            }
        }
    }
}
