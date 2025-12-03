<template>
	<div v-if="modelValue.length" class="w-full flex flex-col gap-2">
		<ul class="w-full flex flex-col items-center gap-2">
			<li class="bg-gray-100 rounded p-2 w-full" v-for="(file, index) in modelValue" :key="index">
				<div class="flex flex-row items-center justify-between text-gray-700 text-sm gap-2">
					<!-- Thumbnail Preview -->
					<div
						v-if="file.preview || file.file_url"
						class="flex-shrink-0 w-12 h-12 rounded overflow-hidden cursor-pointer"
						@click="showFilePreview(file)"
					>
						<img
							:src="file.preview || file.file_url"
							:alt="file.file_name || file.name"
							class="w-full h-full object-cover"
						/>
					</div>

					<span class="grow truncate cursor-pointer" @click="showFilePreview(file)">
						{{ file.file_name || file.name }}
					</span>

					<FeatherIcon
						name="x"
						class="h-4 w-4 cursor-pointer text-gray-700 flex-shrink-0"
						@click="() => confirmDeleteAttachment(file)"
					/>
				</div>
			</li>
		</ul>

		<!-- Delete Confirmation Dialog -->
		<Dialog v-model="showDialog">
			<template #body-title>
				<h2 class="text-lg font-bold">{{ __("Delete Attachment") }}</h2>
			</template>
			<template #body-content>
				<p>
					{{ __("Are you sure you want to delete the attachment") }}
					<span class="font-bold">{{ selectedFile.file_name || selectedFile.name }}</span
					>?
				</p>
			</template>
			<template #actions>
				<div class="flex flex-row gap-4">
					<Button variant="outline" class="py-5 w-full" @click="showDialog = false">
						{{ __("Cancel") }}
					</Button>
					<Button variant="solid" theme="red" @click="handleFileDelete" class="py-5 w-full">
						{{ __("Delete") }}
					</Button>
				</div>
			</template>
		</Dialog>

		<!-- File Preview Modal -->
		<ion-modal ref="modal" :is-open="showPreviewModal" @didDismiss="showPreviewModal = false">
			<FilePreviewModal :file="selectedFile" />
		</ion-modal>
	</div>
</template>

<script setup>
import { FeatherIcon, Dialog, Button } from "frappe-ui"
import { ref, inject } from "vue"
import { IonModal } from "@ionic/vue"

import FilePreviewModal from "@/components/FilePreviewModal.vue"

const __ = inject("$translate")

const props = defineProps({
	modelValue: {
		type: Array,
		required: true,
	},
})

const emit = defineEmits(["handle-file-delete"])

const showDialog = ref(false)
const showPreviewModal = ref(false)
const selectedFile = ref({})

function showFilePreview(fileObj) {
	selectedFile.value = fileObj
	showPreviewModal.value = true
}

function confirmDeleteAttachment(fileObj) {
	selectedFile.value = fileObj
	showDialog.value = true
}

function handleFileDelete() {
	emit("handle-file-delete", selectedFile.value)
	showDialog.value = false
}
</script>

<style scoped>
ion-modal {
	--height: 100%;
}
</style>
