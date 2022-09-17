<template>
	<div
		class="typeahead"
		v-if="props.items.length > 0 && typeof props.items[0] === 'string'">
		<div>Selected: {{ selectedItem }}</div>
		<input @input="filter" @click="toggleList" />
		<ul v-bind:class="{ visible: listVisible }">
			<li
				v-for="item of filteredValues"
				:key="item"
				@dblclick="selectItem"
			>{{ item }}</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	items: any[] | string[];
	objKey?: string;
	selected: any | string;
}>();

const filteredValues = ref<any[] | string[]>(props.items);
const selectedItem = ref<any | string>(props.selected);
const listVisible = ref<boolean>(false);

const filter = (e: Event) => {
	if (e.target.value.length === 0) {
		filteredValues.value = props.items;
		return;
	}
	if (props.items.length > 0 && typeof props.items[0] === 'string') {
		filteredValues.value = props.items.filter(item => {
			return item.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0;
		});
		console.log(filteredValues);
	}
}

const selectItem = (e) => {
	if (props.items.length > 0 && typeof props.items[0] === 'string') {
		selectedItem.value = e.target.textContent;
	}
}

const toggleList = () => {
  listVisible.value = !listVisible.value;
}

</script>

<style scoped lang="scss">
.typeahead {
  position: relative;
}

.typeahead ul {
  list-style: none;
  padding: 0;
  flex-flow: column;
  gap: .5rem;
  overflow-y: scroll;
  width: min-content;
  max-height: 25vh;
  background: wheat;
  margin: 0;
	display: flex;
}

</style>