#!/usr/bin/env groovy
node {
		stage('Poll SCM') {
				checkout scm
		}

		stage('check java') {
				sh "java -version"
		}

		stage('clean') {
				sh "chmod +x mvnw"
				sh "./mvnw -Pdev clean"
		}

		stage('install tools') {
				sh "./mvnw -Pdev com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v8.12.0 -DnpmVersion=6.4.1"
		}

		stage('npm install') {
				sh "sudo ./mvnw -Pdev com.github.eirslett:frontend-maven-plugin:npm"
		}

        stage('backend tests') {
            try {
                sh "./mvnw -Pdev test"
            } catch(err) {
                throw err
            }
        }

        stage('packaging') {
            sh "./mvnw -Pdev verify -DskipTests"
        }
}
