import { FormGroup, Select, SelectItem, TextInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import { upperCase } from 'lodash';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { ILookServiceType } from '@/interfaces/template';
import { useCreateTemplateConfigMutation, useLookupServiceTypeQuery, useUpdateTemplateConfigMutation } from '@/redux/api';
import { initialTemplate } from '@/schemas/dto';
import { IinitialTemplate } from '@/schemas/interface';
import { templateSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

type IProps = {
  open?: boolean;
  formRef: React.RefObject<FormikRefType<IinitialTemplate>>;
  formdata?: IinitialTemplate & { templateId: string };
  handleSubmit: () => void;
  toggleModal: () => void;
};

const CreateTemplateAlertModal = ({ open, toggleModal, formRef, formdata, handleSubmit }: IProps) => {
  const { data, isFetching } = useLookupServiceTypeQuery({});
  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateConfigMutation();
  const [updateTemplate, { isLoading: isUpdating }] = useUpdateTemplateConfigMutation();

  const { toast } = useToast();

  const handleFormSubmit = async (values: IinitialTemplate) => {
    const formvalues = values as IinitialTemplate;
    try {
      if (formdata?.templateId) {
        await updateTemplate(pickValues({ ...formvalues, templateCode: upperCase(formvalues.templateName), templateId: formdata.templateId })).unwrap();
      } else {
        await createTemplate(pickValues({ ...formvalues, templateCode: upperCase(formvalues.templateName) })).unwrap();
      }
      toast('success', 'Saved successfully');
      toggleModal();
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };
  useEffect(() => {
    if (formdata?.templateId) {
      formRef.current?.setValues({ ...formdata });
    }
  }, [formRef, formdata, formdata?.templateId]);

  return (
    <TemplateModalContainer>
      <Modal
        buttonLabel={`${formdata?.templateId ? 'Edit' : 'Create'} template`}
        heading={`${formdata?.templateId ? 'Edit' : 'Create'} template`}
        open={open}
        toggleModal={toggleModal}
        extent="sm"
        onRequestSubmit={handleSubmit}
      >
        <ModalContainer>
          {(isFetching || isCreating || isUpdating) && <Loader />}
          <Formik initialValues={{ ...initialTemplate, ...formdata }} validationSchema={templateSchema} onSubmit={handleFormSubmit} innerRef={formRef}>
            {({ errors, touched, setFieldTouched }) => (
              <Form>
                <FormGroup legendText="">
                  <FormField>
                    <Field name="serviceTypeId">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Service Type" {...field} onKeyUp={() => setFieldTouched('serviceTypeId', true)}>
                          <SelectItem value="" text="Choose option" />
                          {data?.data.map((serviceType: ILookServiceType) => (
                            <SelectItem key={serviceType.id} text={serviceType.name} value={serviceType.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.serviceTypeId && errors.serviceTypeId)} invalidText={errors.serviceTypeId} />
                  </FormField>
                  <FormField>
                    <Field name="templateName">
                      {({ field }: any) => (
                        <>
                          <TextInput
                            {...field}
                            type="text"
                            id="name-input"
                            labelText="Template Name"
                            placeholder="enter name"
                            onKeyUp={() => setFieldTouched('templateName', true)}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.templateName && errors.templateName)} invalidText={errors.templateName} />
                  </FormField>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ModalContainer>
      </Modal>
    </TemplateModalContainer>
  );
};

export default CreateTemplateAlertModal;

const TemplateModalContainer = styled.div`
  .cds--modal-container--sm {
    width: 451px !important;
  }
`;

const ModalContainer = styled.div`
  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;
