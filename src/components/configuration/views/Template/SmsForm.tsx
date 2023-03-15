import { FormGroup, TextArea, TextInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';

import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { ITemplateConfigSms } from '@/interfaces/template';
import { useUpdateTemplateConfigSmsMutation } from '@/redux/api';
import { initialSmsTemplate } from '@/schemas/dto';
import { IinitialSmsTemplate } from '@/schemas/interface';
import { smsTemplateSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialSmsTemplate>>;
  formdata?: ITemplateConfigSms & { templateId: string; serviceTypeId: string };
}

const SmsForm = ({ formdata, formRef }: Iprops) => {
  const [editTemplateSms] = useUpdateTemplateConfigSmsMutation();
  const { toast } = useToast();

  const handleSubmit = async (values: IinitialSmsTemplate) => {
    const formvalues = values as IinitialSmsTemplate;
    try {
      await editTemplateSms(pickValues(formvalues)).unwrap();
      toast('success', 'Saved successfully');
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };

  return (
    <Formik initialValues={{ ...initialSmsTemplate, ...formdata }} validationSchema={smsTemplateSchema} onSubmit={handleSubmit} innerRef={formRef}>
      {({ errors, touched }) => (
        <Form>
          <FormGroup legendText="">
            <FormField>
              <FormContainer>
                <Field name="senderId">{({ field }: any) => <TextInput {...field} type="text" id="senderId-input" labelText="Sender ID" placeholder="input text" />}</Field>
              </FormContainer>
              <ErrorMessage invalid={Boolean(touched.senderId && errors.senderId)} invalidText={errors.senderId} />
            </FormField>{' '}
            <FormField>
              <FormContainer>
                <Field name="smsBody">
                  {({ field }: any) => <TextArea {...field} enableCounter id="text-area-1" labelText="Template body" maxCount={500} placeholder="input text" />}
                </Field>
              </FormContainer>
              <ErrorMessage invalid={Boolean(touched.smsBody && errors.smsBody)} invalidText={errors.smsBody} />
            </FormField>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default SmsForm;

const FormContainer = styled.div`
  width: 100%;
  padding-left: ${px(16)};
  padding-right: ${px(33)};

  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
  input,
  textarea {
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
  }
  textarea {
    min-height: ${px(300)};
  }

  .editor {
    color: ${({ theme }) => theme.colors.white} !important;
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    min-height: ${px(300)} !important;
    padding: ${px(11)} ${px(16)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
    margin-bottom: ${px(50)};
  }
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;
