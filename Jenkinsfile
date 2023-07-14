pipeline {
    agent any
    
    stages {
        stage('clone') {
            steps {
                git 'https://github.com/HaneeshDevops/mern-connectit_v2.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                    sh 'sonar-scanner \
                        -Dsonar.projectKey=MERN_APP \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://54.208.247.173:9000 \
                        -Dsonar.login=sqp_2a2a6cecb3b28d479b3ff6cb1cdc267270d29010'
            }
        }


        stage('Build') {
            steps {
                sh 'docker network create connectit || true'
                sh 'docker volume create connectit || true'
                // sh 'cd server && docker build --no-cache -t haneeshdevops/server . && cd ..'
                // sh 'cd client && docker build --no-cache -t haneeshdevops/client . && cd ..'
                // sh 'docker images'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerRegistry', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh 'docker push haneeshdevops/client:latest'
                    sh 'docker push haneeshdevops/server:latest'
                }
            }
        }
        
        stage('k8s') {
            steps {
                withKubeConfig([credentialsId: 'k8sgroup']) {
                    sh 'git clone https://github.com/HaneeshDevops/mern-connectit_v2.git || true'
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
