<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
			<b-alert show
				dismissible 
				:variant="mensagem.tipo"
				v-for="mensagem in mensagens" :key="mensagem.tipo">
				{{mensagem.texto }}
			</b-alert>

		<b-card>
			<b-form-group label="Nome">
				<b-form-input type="text"
					v-model="usuario.nome"
					placeholder="Digite seu nome"
					size="lg">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Email">
				<b-form-input type="email"
					v-model="usuario.email"
					placeholder="Digite seu email"
					size="lg">
				</b-form-input>
			</b-form-group>
			<hr>		

			<b-button variant="primary"
				size="lg"
				@click="save(usuario.id)"
				class="mr-1">
				Salvar
			</b-button>
			<b-button
				variant="success"
				size="lg"
				@click="getDate()">
				Obter Dados
			</b-button>
			<hr>
			<transition name="fade" mode="out-in">
				<b-list-group>
					<b-list-group-item v-for="(usuario, i) in usuarios" :key="i">
						<strong>Nome :{{usuario.nome}} </strong>
						<strong><b>email : </b> {{usuario.email}} </strong>
						<strong><b>ID : </b> {{usuario.id}} </strong><br>
						<b-button variant="warning" size="lg"
							@click="carregar(usuario.id)">Carregar</b-button>
						<b-button variant="danger" size="lg"
							class="ml-1"
							@click="excluir(usuario.id)">Excluir</b-button>	
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
				email:'',
				id:''
			},
			mensagens: [],
			infoGetData: false
		}
	},
	methods: {
		save (id) {
			const metodo = this.usuario.id ? 'patch' : 'post'
			const finalUrl = this.usuario.id ? `/usuario/${id}.json` : `usuario.json`
			this.$http[metodo](finalUrl , {
				nome: this.usuario.nome,
				email: this.usuario.email
			})
			.then(res => {
					this.clear()
					this.mensagens.push({
						texto: 'Cadastrado com sucesso',
						tipo: 'info'
					})
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
				if(this.usuarios.length === 0) {
					this.mensagens.push({
						texto: 'Não há dados',
						tipo: 'danger'
					})
					setTimeout(() => {
						this.infoGetData = false
					},2000)
				}
				// eslint-disable-next-line no-console
				console.log(this.usuarios.length)
			}, error => {
				alert(error)
			})
		},
		clear () {
			this.usuario.nome = ''
			this.usuario.email = ''
			this.usuario.id = null,
			this.mensagem = []
		},
		carregar (id) {
			this.usuario.id = id
			this.usuarios.filter(data => {
				if (data.id === this.usuario.id) {
					this.usuario.nome = data.nome
					this.usuario.email = data.email
					this.usuario.id = data.id
				}
			})
		},
		excluir (id) {
			this.$http.delete(`/usuario/${id}.json`)
				.then(() => {
					// this.clear()
					this.mensagens.push({
						texto: 'Excluido com sucesso',
						tipo: 'success'
					})
					this.getDate()
					setTimeout(() =>{
						this.remove = false
					},2000)
				})
				.catch(err => {
					this.clear()
					this.mensagens.push({
						texto: 'Erro ao excluir',
						tipo: 'danger',
						info: err
					})
				})
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
