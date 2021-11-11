<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-card>
			<b-form-group label="Nome">
				<b-form-input type="text"
					v-model="usuario.nome"
					placeholder="Digite seu nome"
					size="lg">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Email">
				<b-form-input type="e-mail"
					v-model="usuario.email"
					placeholder="Digite seu email"
					size="lg">
				</b-form-input>
			</b-form-group>
			<hr>
			<b-button variant="primary"
				size="lg"
				@click="save"
				class="mr-4">
				Salvar
			</b-button>
			<b-button
				variant="success"
				size="lg"
				@click="getDate">
				Obter Dados
			</b-button>
			<hr>
			<transition name="fade" mode="out-in">
				<b-list-group>
					<b-list-group-item v-for="(usuario, i) in usuarios" :key="i">
						<strong>Nome :{{usuario.nome}} </strong>
						<strong><b>email : </b> {{usuario.email}} </strong>
						<strong><b>ID : </b> {{usuario.id}} </strong>
					</b-list-group-item>
				</b-list-group>
			</transition>
		</b-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			usuarios: [],
			usuario: {
				nome:'',
				email:''
			}
		}
	},
	methods: {
		save () {
			this.$http.post('usuario.json', {
				nome: this.usuario.nome,
				email: this.usuario.email
			}).then(res => {
				this.clear()
				this.getDate()
				// eslint-disable-next-line no-console
				console.log(res)
			}, error => {
				alert(error)
			})
		},
		getDate () {
			this.$http.get('usuario.json').then(res => {
				this.usuarios = res
				// eslint-disable-next-line no-console
				console.log(this.usuarios)
			}, error => {
				alert(error)
			})
		},
		clear () {
			this.usuario.nome = ''
			this.usuario.email = ''
		}
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
