import Block from '../../services/Block';

import Input from '../Input';

import { LabelTemplate } from './index';
import './Label.style.pcss';

export interface LabelProps {
  className?: string;
  disabled?: boolean;
  id: string;
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  errorMessage?: string;
  Input?: Input;
}

export default class Label extends Block<LabelProps> {
  constructor(props: LabelProps) {
    const { type, className, name, value, id, disabled, label } = props;
    super({
      Input: new Input({
        className,
        disabled,
        id,
        name,
        type,
        value,
        onFocus: () => {
          console.log(33);
        },
        onBlur: (e) => {
          this.isValid(e);
        },
      }),
      label,
      className,
      id,
      errorMessage: '',
    });
  }

  isValid(e): void {
    if (e.target.value === '1') {
      this.setProps({
        ...this.props,
        errorMessage: '1',
      });
    }
  }

  // isValid(): void {
  // 	let elementValidation
  // 	const {} = this.props
  // 	if (customValidateRule?.rule && customValidateRule.message) {
  // 		elementValidation = validator.isValid(this.children.InputElement.element, customValidateRule.rule, customValidateRule.message)
  // 	} else {
  // 		elementValidation = validator.isValid(this.children.InputElement.element)
  // 	}
  // 	this.children.ErrorMessage.setProps({text: elementValidation.errorMessage})
  // 	if (!elementValidation.isValid) {
  // 		this.children.ErrorMessage.show()
  // 	} else {
  // 		this.children.ErrorMessage.hide()
  // 	}
  // }

  render() {
    return LabelTemplate;
  }
}
