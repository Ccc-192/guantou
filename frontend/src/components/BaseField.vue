<path>C:\Users\15265\Desktop\guantou\frontend\src\components\BaseField.vue</path>
<type>file</type>
<content>
1: <path>C:\Users\15265\Desktop\guantou\frontend\src\components\BaseField.vue</path>
2: <type>file</type>
3: <content>
4: 1: <template>
5: 2:   <t-form-item
6: 3:     class="base-field"
7: 4:     :name="name"
8: 5:     :label="label"
9: 6:     :help="help"
10: 7:     :required-mark="required"
11: 8:     :rules="rules"
12: 9:     label-align="top"
13: 10:   >
14: 11:     <view class="base-field-control">
15: 12:       <slot>
16: 13:         <t-textarea
17: 14:           v-if="type === 'textarea'"
18: 15:           :value="modelValue"
19: 16:           :placeholder="placeholder"
20: 17:           :maxlength="maxlength"
21: 18:           :disabled="disabled"
22: 19:           :readonly="readonly"
23: 20:           :autosize="resolvedAutosize"
24: 21:           :indicator="indicator"
25: 22:           bordered
26: 23:           @change="handleChange"
27: 24:           @blur="$emit('blur', $event)"
28: 25:           @focus="$emit('focus', $event)"
29: 26:         />
30: 27:         <t-input
31: 28:           v-else
32: 29:           :value="modelValue"
33: 30:           :type="inputType"
34: 31:           :placeholder="placeholder"
35: 32:           :maxlength="maxlength"
36: 33:           :disabled="disabled"
37: 34:           :readonly="readonly"
38: 35:           :clearable="clearable"
39: 36:           :status="error ? 'error' : 'default'"
40: 37:           borderless
41: 38:           @change="handleChange"
42: 39:           @blur="$emit('blur', $event)"
43: 40:           @focus="$emit('focus', $event)"
44: 41:         />
45: 42:       </slot>
46: 43:     </view>
47: 44:     <view
48: 45:       v-if="error"
49: 46:       class="base-field-error"
50: 47:     >
51: 48:       {{ error }}
52: 49:     </view>
53: 50:   </t-form-item>
54: 51: </template>
55: 52:
56: 53: <script>
57: 54: import TFormItem from '@tdesign/uniapp/form-item/form-item.vue';
58: 55: import TInput from '@tdesign/uniapp/input/input.vue';
59: 56: import TTextarea from '@tdesign/uniapp/textarea/textarea.vue';
60: 57:
61: 58: export default {
62: 59:   name: 'BaseField',
63: 60:   components: { TFormItem, TInput, TTextarea },
64: 61:   props: {
65: 62:     modelValue: { type: [String, Number], default: '' },
66: 63:     name: { type: String, required: true },
67: 64:     label: { type: String, default: '' },
68: 65:     type: {
69: 66:       type: String,
70: 67:       default: 'text',
71: 68:       validator: (value) =>
72:         ['text', 'textarea', 'number', 'digit', 'password', 'tel'].includes(value),
73: 69:     },
74: 70:     placeholder: { type: String, default: '' },
75: 71:     maxlength: { type: Number, default: -1 },
76: 72:     disabled: { type: Boolean, default: false },
77: 73:     readonly: { type: Boolean, default: false },
78: 74:     required: { type: Boolean, default: false },
79: 75:     rules: { type: Array, default: () => [] },
80: 76:     help: { type: String, default: '' },
81: 77:     error: { type: String, default: '' },
82: 78:     autosize: { type: [Boolean, Object], default: false },
83: 79:     indicator: { type: Boolean, default: false },
84: 80:     clearable: { type: Boolean, default: false },
85:     passwordProp: { type: Boolean, default: false },
86: 81:   },
87: 82:   emits: ['update:modelValue', 'change', 'input', 'blur', 'focus'],
88: 83:   computed: {
89: 84:     inputType() {
90: 85:       if (this.type === 'tel') return 'number';
91: 86:       return this.type;
92: 87:     },
93: 88:     resolvedAutosize() {
94: 89:       if (this.autosize) return this.autosize;
95: 90:       return { minHeight: 80 };
96: 91:     },
97: 92:   },
98: 93:   methods: {
99: 94:     handleChange(event) {
100: 95:       const value = event?.detail?.value ?? event?.value ?? event ?? '';
101: 96:       this.$emit('update:modelValue', value);
102: 97:       this.$emit('change', value);
103: 98:       this.$emit('input', value);
104: 99:     },
105: 100:   },
106: 101: };
107: 102: </script>
108: 103:
109: 104: <style scoped>
110: 105: .base-field {
111: 106:   --td-form-item-border-color: transparent;
112: 107:   --td-form-item-horizontal-padding: 0;
113: 108:   --td-form-item-vertical-padding: var(--space-2);
114: 109:   --td-input-bg-color: var(--surface-color);
115: 110:   --td-input-vertical-padding: var(--space-2) var(--space-3);
116: 111:   --td-textarea-background-color: var(--surface-color);
117: 112:   --td-textarea-padding: var(--space-2) var(--space-3);
118: 113: }
119: 114:
120: 115: .base-field-error {
121: 116:   margin-top: var(--space-1);
122: 117:   color: var(--danger-color);
123: 118:   font-size: var(--font-size-xs);
124: 119: }
125: 120:
126: 121: .base-field-control {
127: 122:   width: 100%;
128: 123:   min-width: 0;
129: 124: }
130: 125: </style>
131: 126:
132:
133: (End of file - total 126 lines)
134: </content>

(End of file - total 134 lines)
</content>
