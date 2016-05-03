<template>
	<div class="thumbnail">
		<div class="content caption">
			<h3 class="title">
				{{ note.title }}
			</h3>

			{{ note.body | str_limit '0' '200' }}

			<div class="action">
				<a @click="editForm(note)"
					href="#"
					class="btn btn-default btn-sm" role="button" data-toggle="tooltip" title="Edit">
					<i class="fa fa-pencil"></i>
				</a>
				<a @click="deleteNote(note)"
					role="button" class="btn btn-danger btn-sm" role="button" data-toggle="tooltip" title="Delete">
					<i class="fa fa-trash"></i>
				</a>
				<small v-show="note.created_at_formatted">
					<i class="fa fa-clock-o"></i> {{ note.created_at_formatted }}
				</small>
			</div>
		</div>
	</div>
</template>

<script>
	import NoteServices from '../services/NoteServices'

	export default {
		props: ['note'],

		created () {
			// console.log(this.$parent.hello())
		},

		methods: {
			editForm (note) {
				this.$parent.editForm(note)
			},

			deleteNote (note) {
				this.$parent.deleteNote(note)
			}
		}
	}
</script>

<style>
	
</style>