'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { navigate } from '@/features/common';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { ICreateShortUrlApiPayload } from '../apis/types';

interface IShortUrlForm {
  serverAction: any;
  initialValue?: ICreateShortUrlApiPayload;
}

export const ShortUrlForm = (props: IShortUrlForm) => {
  const {
    serverAction,
    initialValue = {
      fullUrl: '',
      isActive: true,
      shortUrl: '',
    },
  } = props;

  const [form, setForm] = useState<ICreateShortUrlApiPayload>(initialValue);

  /**
   * This method is used to submit form.
   * @param formData: Formdata includes short url fields
   */
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await serverAction(form);

    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      navigate(`/dashboard/link/${response.data?.shortUrl}`);
    }
  };

  /**
   * This method is used to update text form field.
   * @param event: Native event
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm: ICreateShortUrlApiPayload) => ({ ...prevForm, [name]: value }));
  };

  /**
   * This method is used to update text form field.
   * @param event: Native event
   */
  const handleCheckChange = (checked: CheckedState) => {
    setForm((prevForm: ICreateShortUrlApiPayload) => ({
      ...prevForm,
      isActive: checked as boolean,
    }));
  };

  return (
    <Card>
      <form onSubmit={handleFormSubmit}>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="originalLink">Original Link *</Label>
              <Input
                id="originalLink"
                name="fullUrl"
                type="text"
                value={form.fullUrl}
                placeholder="https://www.quickurl.com/search?q=how+to+make+short+url+ ..."
                required
                onChange={handleTextChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortLink">Short Link Id</Label>
              <Input
                id="shortLink"
                name="shortUrl"
                placeholder="abc"
                value={form.shortUrl}
                onChange={handleTextChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                name="isActive"
                checked={form.isActive}
                onCheckedChange={handleCheckChange}
              />
              <Label htmlFor="isActive" className="ml-3">
                Set Link Active
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="px-8">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
