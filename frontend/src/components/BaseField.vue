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
31:           :password="passwordProp"
32:           :placeholder="placeholder"
33:           :maxlength="maxlength"
34:           :disabled="disabled"
35:           :readonly="readonly"
36:           :clearable="clearable"
37:           :status="error ? 'error' : 'default'"
38:           borderless
39:           @change="handleChange"
40:           @blur="$emit('blur', $event)"
41:           @focus="$emit('focus', $event)"
42:         />
43:       </slot>
44:     </view>
45:     <view
46:       v-if="error"
47:       class="base-field-error"
48:     >
49:       {{ error }}
50:     </view>
51:   </t-form-item>
52: </template>
53:
54: <script>
55: import TFormItem from '@tdesign/uniapp/form-item/form-item.vue';
56: import TInput from '@tdesign/uniapp/input/input.vue';
57: import TTextarea from '@tdesign/uniapp/textarea/textarea.vue';
58:
59: export default {
60:   name: 'BaseField',
61:   components: { TFormItem, TInput, TTextarea },
62:   props: {
63:     modelValue: { type: [String, Number], default: '' },
64:     name: { type: String, required: true },
65:     label: { type: String, default: '' },
66:     type: {
67:       type: String,
68:       default: 'text',
69:       validator: (value) =>
        ['text', 'textarea', 'number', 'digit', 'password', 'tel'].includes(value),
70:     },
71:     placeholder: { type: String, default: '' },
72:     maxlength: { type: Number, default: -1 },
73:     disabled: { type: Boolean, default: false },
74:     readonly: { type: Boolean, default: false },
75:     required: { type: Boolean, default: false },
76:     rules: { type: Array, default: () => [] },
77:     help: { type: String, default: '' },
78:     error: { type: String, default: '' },
79:     autosize: { type: [Boolean, Object], default: false },
80:     indicator: { type: Boolean, default: false },
81:     clearable: { type: Boolean, default: false },
82:   },
83:   emits: ['update:modelValue', 'change', 'input', 'blur', 'focus'],
84:   computed: {
85:     inputType() {
86:       if (this.type === 'password') return 'text';
87:       if (this.type === 'tel') return 'number';
88:       return this.type;
89:     },
90:     passwordProp() {
91:       return this.type === 'password' ? true : undefined;
92:     },
93:     resolvedAutosize() {
94:       if (this.autosize) return this.autosize;
95:       return { minHeight: 80 };
96:     },
97:   },
98:   methods: {
99:     handleChange(event) {
100:       const value = event?.detail?.value ?? event?.value ?? event ?? '';
101:       this.$emit('update:modelValue', value);
102:       this.$emit('change', value);
103:       this.$emit('input', value);
104:     },
105:   },
106: };
107: </script>
108:
109: <style scoped>
110: .base-field {
111:   --td-form-item-border-color: transparent;
112:   --td-form-item-horizontal-padding: 0;
113:   --td-form-item-vertical-padding: var(--space-2);
114:   --td-input-bg-color: var(--surface-color);
115:   --td-input-vertical-padding: var(--space-2) var(--space-3);
116:   --td-textarea-background-color: var(--surface-color);
117:   --td-textarea-padding: var(--space-2) var(--space-3);
118: }
119:
120: .base-field-error {
121:   margin-top: var(--space-1);
122:   color: var(--danger-color);
123:   font-size: var(--font-size-xs);
124: }
125:
126: .base-field-control {
127:   width: 100%;
128:   min-width: 0;
129: }
130: </style>
131:

(End of file - total 131 lines)
</content>
