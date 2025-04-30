'use server';

export async function sendMessage(_: unknown, formData: FormData): Promise<{ message: string }> {
  'use server';
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate 3s delay

    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')

    console.log({ name, email, subject, message })

    return { message: 'ok' };
  } catch (error) {
    const errorMessage = error as string;
    return { message: errorMessage };
  }

}