pipeline {
    agent {
        label 'kriya'  // Ensure this label matches the Docker agent in Jenkins
    }

    environment {
        // Define Docker image name, repository URL, and other needed variables
        DOCKER_IMAGE = "kriyahelpdesk"
        DOCKER_IMAGE_TAG = 'latest'
        REPOSITORY_URL = "https://github.com/akashShanmugraj/kriya25-helpdesk"
        BRANCH = "production"
        CREDENTIALS = "psgdcgit"
        DOCKER_CONTAINER = "kriyahelpdesk"
        
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout the latest code from the GitHub repository
                git branch: "${BRANCH}", credentialsId: "${CREDENTIALS}", url: "${REPOSITORY_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image from the Dockerfile in the repository
                     //echo "Building Docker image: ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                    sh '''
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_IMAGE_TAG} .
                    '''


                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop the old container (if running) and start the new one
                    sh """
                    if [ \$(docker ps -q -f name=${DOCKER_CONTAINER}) ]; then
                        docker stop ${DOCKER_CONTAINER}
                        docker rm ${DOCKER_CONTAINER}
                    fi
                    docker run -d --name ${DOCKER_CONTAINER} -p 6002:3000 -e USERNAME=kriya25helpdesk -e PASSWORD=12345 -e BACKEND_URL="https://kriyabackend.psgtech.ac.in" ${DOCKER_IMAGE}:${DOCKER_IMAGE_TAG}

                    """
                }
            }
        }
    }

    post {
        success {
            echo "Docker container deployed successfully!"
            sh '''
                docker images -f "dangling=true" -q | xargs -r docker rmi
                docker builder prune -f
               
            '''
        }
        failure {
            echo "Build or deployment failed."
            script {
                def discordWebhookUrl = "https://discord.com/api/webhooks/1340718708678721637/z7nMt0e3L_Tj7m-BhQYS5kMJm-Sp8xCeMv_FVG0JQCy15o7Sjo3sKqo3ZNcVJk5ffyBD"
                def logSnippet = sh(script: "tail -n 10 \$JENKINS_HOME/jobs/\$JOB_NAME/builds/\$BUILD_NUMBER/log", returnStdout: true).trim()
                def message = """
                🚨 Jenkins Pipeline Failure
                - **Build #${BUILD_NUMBER}** for kriya backend has failed.
                - **Job**: ${JOB_NAME}
                - **Branch**: ${BRANCH_NAME}
                - **Reason**: 
                ```
                ${logSnippet}
                ```
                """
    
                sh """
                curl -X POST -H 'Content-Type: application/json' \
                -d '{"username": "Jenkins Build Bot", "content": "'"${message}"'"}' \
                ${discordWebhookUrl}
                """
            }
        }
    }
}