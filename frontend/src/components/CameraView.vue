<template>
	<div class="flex flex-col gap-2">
		<!-- Camera Capture Button -->
		<button
			@click="captureImage"
			type="button"
			class="flex flex-col w-full border shadow-sm items-center rounded p-3 gap-2 cursor-pointer hover:bg-gray-50"
		>
			<FeatherIcon name="camera" class="h-6 w-6 text-gray-700" />
			<span class="block text-sm font-normal leading-5 text-gray-700">
				{{ __("Take a photo") }}
			</span>
		</button>
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

// Dynamically import Capacitor Camera to avoid SSR/build issues
let Camera = null
let CameraResultType = null
let CameraSource = null

async function loadCamera() {
	if (!Camera) {
		try {
			const cameraModule = await import("@capacitor/camera")
			Camera = cameraModule.Camera
			CameraResultType = cameraModule.CameraResultType
			CameraSource = cameraModule.CameraSource
		} catch (error) {
			console.warn("Capacitor Camera not available, falling back to file input", error)
			return false
		}
	}
	return true
}

async function captureImage() {
	const cameraLoaded = await loadCamera()

	if (!cameraLoaded || !Camera) {
		console.error("Camera API is not available")
		return
	}

	try {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Uri,
			source: CameraSource.Camera,
		})

		// Convert the image to a File object
		const response = await fetch(image.webPath)
		const blob = await response.blob()
		const timestamp = new Date().getTime()
		const fileName = `IMG_${timestamp}.${image.format || "jpg"}`

		const file = new File([blob], fileName, {
			type: `image/${image.format || "jpeg"}`,
		})

		// Create a custom event to pass the file
		const event = {
			target: {
				files: [file],
			},
		}

		// Add preview URL to the file object for display
		file.preview = image.webPath

		emit("handle-file-select", event)
	} catch (error) {
		console.error("Error capturing image:", error)
		// If user cancels or there's an error, fail silently
	}
}
</script>

<style scoped>
ion-modal {
	--height: 100%;
}
</style>
