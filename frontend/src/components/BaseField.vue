<path>C:\Users\15265\Desktop\guantou\frontend\src\components\BaseField.vue</path>
<type>file</type>
<content>
1: <template>
2:   <t-form-item
3:     class="base-field"
4:     :name="name"
5:     :label="label"
6:     :help="help"
7:     :required-mark="required"
8:     :rules="rules"
9:     label-align="top"
10:   >
11:     <view class="base-field-control">
12:       <slot>
13:         <t-textarea
14:           v-if="type === 'textarea'"
15:           :value="modelValue"
16:           :placeholder="placeholder"
17:           :maxlength="maxlength"
18:           :disabled="disabled"
19:           :readonly="readonly"
20:           :autosize="resolvedAutosize"
21:           :indicator="indicator"
22:           bordered
23:           @change="handleChange"
24:           @blur="$emit('blur', $event)"
25:           @focus="$emit('focus', $event)"
26:         />
27:         <t-input
28:           v-else
29:           :value="modelValue"
30:           :type="inputType"
31:           :placeholder="placeholder"
32:           :maxlength="maxlength"
33:           :disabled="disabled"
34:           :readonly="readonly"
35:           :clearable="clearable"
36:           :status="error ? 'error' : 'default'"
37:           borderless
38:           @change="handleChange"
39:           @blur="$emit('blur', $event)"
40:           @focus="$emit('focus', $event)"
41:         />
42:       </slot>
43:     </view>
44:     <view
45:       v-if="error"
46:       class="base-field-error"
47:     >
48:       {{ error }}
49:     </view>
50:   </t-form-item>
51: </template>
52: 
53: <script>
54: import TFormItem from '@tdesign/uniapp/form-item/form-item.vue';
55: import TInput from '@tdesign/uniapp/input/input.vue';
56: import TTextarea from '@tdesign/uniapp/textarea/textarea.vue';
57: 
58: export default {
59:   name: 'BaseField',
60:   components: { TFormItem, TInput, TTextarea },
61:   props: {
62:     modelValue: { type: [String, Number], default: '' },
63:     name: { type: String, required: true },
64:     label: { type: String, default: '' },
65:     type: {
66:       type: String,
67:       default: 'text',
68:       validator: (value) =>
        ['text', 'textarea', 'number', 'digit', 'password', 'tel'].includes(value),
69:     },
70:     placeholder: { type: String, default: '' },
71:     maxlength: { type: Number, default: -1 },
72:     disabled: { type: Boolean, default: false },
73:     readonly: { type: Boolean, default: false },
74:     required: { type: Boolean, default: false },
75:     rules: { type: Array, default: () => [] },
76:     help: { type: String, default: '' },
77:     error: { type: String, default: '' },
78:     autosize: { type: [Boolean, Object], default: false },
79:     indicator: { type: Boolean, default: false },
80:     clearable: { type: Boolean, default: false },
    passwordProp: { type: Boolean, default: false },
81:   },
82:   emits: ['update:modelValue', 'change', 'input', 'blur', 'focus'],
83:   computed: {
84:     inputType() {
85:       if (this.type === 'tel') return 'number';
86:       return this.type;
87:     },
88:     resolvedAutosize() {
89:       if (this.autosize) return this.autosize;
90:       return { minHeight: 80 };
91:     },
92:   },
93:   methods: {
94:     handleChange(event) {
95:       const value = event?.detail?.value ?? event?.value ?? event ?? '';
96:       this.$emit('update:modelValue', value);
97:       this.$emit('change', value);
98:       this.$emit('input', value);
99:     },
100:   },
101: };
102: </script>
103: 
104: <style scoped>
105: .base-field {
106:   --td-form-item-border-color: transparent;
107:   --td-form-item-horizontal-padding: 0;
108:   --td-form-item-vertical-padding: var(--space-2);
109:   --td-input-bg-color: var(--surface-color);
110:   --td-input-vertical-padding: var(--space-2) var(--space-3);
111:   --td-textarea-background-color: var(--surface-color);
112:   --td-textarea-padding: var(--space-2) var(--space-3);
113: }
114: 
115: .base-field-error {
116:   margin-top: var(--space-1);
117:   color: var(--danger-color);
118:   font-size: var(--font-size-xs);
119: }
120: 
121: .base-field-control {
122:   width: 100%;
123:   min-width: 0;
124: }
125: </style>
126: 

(End of file - total 126 lines)
</content>