'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createShortUrlAction } from '../server-actions';
import { toast } from 'sonner';
import { navigate } from '@/features/common';

export const DashboardAddUrlScreen = () => {
  /**
   * This method is used to create new short url.
   * @param formData: Formdata includes create short url fields
   */
  const handleCreateShortUrl = async (formData: FormData) => {
    const response = await createShortUrlAction(formData);

    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      navigate('/dashboard');
    }
  };
  return (
    <div>
      <h1 className="mx-3 mb-6 text-3xl font-semibold max-md:mb-4 max-md:text-xl">
        Add New Link✌🏻
      </h1>
      <Card>
        <form action={handleCreateShortUrl}>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="originalLink">Original Link *</Label>
                <Input
                  id="originalLink"
                  name="fullUrl"
                  type="text"
                  placeholder="https://www.google.com/search?q=how+to+make+short+url+&sca_esv=4bddefd6wiz ..."
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shortLink">Short Link Id</Label>
                <Input id="shortLink" name="shortUrl" placeholder="abc" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isActive" name="isActive" defaultChecked />
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
    </div>
  );
};
