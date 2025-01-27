import React from 'react';

export type Field = {
  type: 'section' | 'text' | 'email' | 'tel' | 'number'| 'textarea' | 'file' | 'date' | 'checkbox' | 'select' | 'radio' ;
  id: string;
  label?: string;
  placeholder?: string;  
  colSize: string;
  options?: { label: string; value: string }[];  
  isChecked?: boolean;  
  multiple?: boolean;  
};

type FormComponentProps = {
  fields: (Field | Field[])[];
  handleInputChange: (id: string, value: unknown) => void;
};

const FormComponent: React.FC<FormComponentProps> = ({ fields, handleInputChange }) => {

  const renderField = (field: Field, index: number) => {
    switch (field.type) {
      case 'section':
        return (
          field.label ? <div key={index} className={`${field.colSize} mb-3`}>
            <h5>{field.label}</h5>
          </div> : false
        );
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} aria-label={field.label}>
              {field.label}
            </label> : false}
            <input 
              type={field.type} 
              id={field.id} 
              className="form-control" 
              placeholder={field.placeholder || ''}
              onChange={e => handleInputChange(field.id, e.target.value)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id} aria-label={field.label}>
              {field.label}
            </label> : false}
            <textarea 
              id={field.id} 
              className="form-control" 
              rows={5}
              placeholder={field.placeholder || ''}
              onChange={e => handleInputChange(field.id, e.target.value)}
            ></textarea>
          </div>
        );

      case 'file':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            <label htmlFor={field.id} className={`${field.colSize} d-flex align-items-lg-center border border-1 rounded-3 p-2`}>
            {field.label ? <p className="text-muted small mb-0">{field.label}</p> : false}
              <input 
                type="file" 
                id={field.id} 
                className="d-none" 
                accept="image/jpeg,image/jpg,image/png" 
                onChange={e => handleInputChange(field.id, e.target.files?.[0] || null)}
              />
            </label>
          </div>
        );

      case 'date':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id}>{field.label}</label> : false}
            <input 
              type="date" 
              id={field.id} 
              className="form-control" 
              onChange={e => handleInputChange(field.id, e.target.value)}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={index} className={`${field.colSize} mb-3 form-check`}>
            <input 
              type="checkbox" 
              id={field.id} 
              className="form-check-input" 
              defaultChecked={field.isChecked || false}
              onChange={e => handleInputChange(field.id, e.target.checked)}
            />
            {field.label ? <label htmlFor={field.id} className="form-check-label">
              {field.label}
            </label> : false}
          </div>
        );

      case 'select':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label htmlFor={field.id}>{field.label}</label> : false}
            <select 
              id={field.id} 
              className="form-select" 
              onChange={e => handleInputChange(field.id, e.target.value)}
              multiple={field.multiple}
            >
              {field.options?.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'radio':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {field.label ? <label>{field.label}</label> : false}
            <div>
              {field.options?.map((option, idx) => (
                <div key={idx} className="form-check">
                  <input 
                    type="radio" 
                    id={`${field.id}-${option.value}`} 
                    name={field.id} 
                    value={option.value} 
                    className="form-check-input" 
                    onChange={e => handleInputChange(field.id, e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`${field.id}-${option.value}`}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      
      default:
        return null;
    }
  };

  return (
    <div className="row">
      {fields.map((fieldGroup, index) => {
        if (Array.isArray(fieldGroup)) {
          return (
            <React.Fragment key={index}>
              {fieldGroup.map((field, i) => renderField(field, i))}
            </React.Fragment>
          );
        }
        return renderField(fieldGroup as Field, index);
      })}
    </div>
  );
};

export default FormComponent;