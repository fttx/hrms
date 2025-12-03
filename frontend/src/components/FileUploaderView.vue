<template>
	<div class="flex flex-col gap-2">
		<label class="file-select cursor-pointer">
			<div
				class="flex flex-col w-full border shadow-sm items-center rounded p-3 gap-2 hover:bg-gray-50"
			>
				<FeatherIcon name="upload" class="h-6 w-6 text-gray-700" />
				<span class="block text-sm font-normal leading-5 text-gray-700">
					{{ __("Upload images or documents") }}
				</span>
			</div>
			<input
				class="hidden"
				ref="input"
				type="file"
				multiple
				accept="*"
				@change="(e) => emit('handle-file-select', e)"
			/>
		</label>
	</div>
</template>

<script setup>
import { FeatherIcon } from "frappe-ui"
import { ref } from "vue"

const props = defineProps({
	modelValue: {
		type: Array,
		required: true,
	},
})

const emit = defineEmits(["handle-file-select", "handle-file-delete"])

const input = ref(null)
</script>

<style scoped>
ion-modal {
	--height: 100%;
}
</style>
