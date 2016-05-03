<template>
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<form-note></form-note>
		</div>
	</div>

	<div class="progress" v-if="$loadingRouteData">
		<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
			<span class="sr-only">Loading...</span>
		</div>
	</div>

	<div class="grid clearfix" v-if="!$loadingRouteData">
		<note
			v-for="note in notes"
        	:note="note"
        	track-by="$index"
    	>
    	</note>
	</div>
</template>

<script>
	import Note from '../components/Note'
	import FormNote from '../components/FormNote'
	import NoteServices from '../services/NoteServices'

	export default {
		name: 'home',

		components: { Note, FormNote },

		data () {
			return Object.assign({}, NoteServices.noteData, {
				notes: []
			})
		},

		methods: {
			createNote () {
				var self = this
				NoteServices
					.create(this.newNote)
					.then(function(response) {

						self.$dispatch('noteWasCreated', response.data)

						// clear data
						NoteServices._clearForm()
					})
			},

			updateNote (context) {
				var self = context || this
				NoteServices
					.update(self.newNote)
					.then(function(response) {
						console.log(response)
						self.$dispatch('noteWasUpdated', self.newNote)

						// clear data
						NoteServices._clearForm(self)
					})
			},

			deleteNote (note) {
				swal({
					title: "Are you sure?",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Yes!",
					closeOnConfirm: false
				}, () => {
					var self = this

					NoteServices.delete(note.id)
					.then(function() {
						swal("Success Deleted!", "Your note has been deleted.", "success")
						// self.$router.go({ name: 'home' })
						self.$dispatch('noteWasDeleted', note)
					})
				});
			},

			editForm(note) {
				this.newNote = {
					id: note.id,
					title: note.title,
					body: note.body,
				}
				this.mode = 'edit'
			},
		},

		events: {
			noteWasCreated (note) {
				// here we will append to first of notes list
				this.notes.unshift(note)
			},

			noteWasUpdated (note) {
				var self = this
				NoteServices
					.getAll()
					.then(function(response) {
						self.notes = response.data
					})
			},

			noteWasDeleted (note) {
				this.notes.$remove(note)
			}
		},

		route: {
			data () {
				return NoteServices.getAll()
					.then(function(response) {
						return {
							notes: response.data
						}
					})
			}
		},
	}
</script>