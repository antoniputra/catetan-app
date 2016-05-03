<template>
	<form class="form-note">
		<input type="hidden" v-model="newNote.id" />
		<textarea v-model="newNote.title" class="form-control title flexible" placeholder="Title" rows="1"></textarea>
		<div>
			<textarea v-model="newNote.body" class="form-control content flexible" rows="2" placeholder="Write note..."></textarea>
		</div>
		<div class="action clearfix">
			<div class="pull-left">
				<!-- <a class="btn btn-default btn-sm" data-toggle="tooltip" title="picture">
					<i class="fa fa-picture-o"></i>
				</a>
				<a @click="coba()" class="btn btn-default btn-sm" data-toggle="tooltip" title="pencil">
					<i class="fa fa-pencil"></i>
				</a> -->
			</div>
			<div class="pull-right">
				<button v-if="mode == ''" @click.prevent="createNote()" type="submit" class="btn btn-default btn-sm">
					Create
				</button>

				<button v-if="mode == 'edit'" @click.prevent="updateNote()" type="submit" class="btn btn-default btn-sm">
					Update
				</button>
				<button v-if="mode == 'edit'" @click.prevent="_clearForm()" type="submit" class="btn btn-default btn-sm">
					Cancel
				</button>
			</div>
		</div>
	</form>
</template>

<script>
	import NoteServices from '../services/NoteServices'

	export default {
		data () {
			return this.$parent.$data
		},

		methods: {
			_clearForm() {
				return NoteServices._clearForm(this)
			},

			createNote() {
				this.$parent.createNote()
			},

			updateNote() {
				this.$parent.updateNote(this)
			}
		},

		ready() {
			var autosize = require('autosize')
			autosize(document.getElementsByClassName('flexible'))
		}
	}
</script>