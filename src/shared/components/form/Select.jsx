import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]).isRequired,
  };

  static defaultProps = {
    placeholder: '',
    options: [],
  };

  handleChange = (selectedOption) => {
    this.props.onChange(selectedOption);
  };

  customStyles = {
    control: base => ({
      ...base,
      height: 40,
      minHeight: 40,
      borderColor: '#dce1e9',
      borderRadius: 0,
    }),
    placeholder: provided => ({
      ...provided,
      color: 'rgba(140, 140, 140, 1)',
    }),
    option: provided => ({
      ...provided,
      borderRadius: 0,

    }),
    menu: provided => ({
      ...provided,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: provided => ({
      ...provided,
      padding: 0,
    }),
  };

  render() {
    const {
      value, name, placeholder, options,
    } = this.props;

    return (
      <Select
        styles={this.customStyles}
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        className="form__form-group-select"
        placeholder={placeholder}
      />
    );
  }
}

const renderSelectField = props => (
  <div className="form__form-group-input-wrap">
    <SelectField
      {...props.input}
      options={props.options}
      placeholder={props.placeholder}
    />
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.meta.error}</span>}
  </div>
);

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
};

export default renderSelectField;
