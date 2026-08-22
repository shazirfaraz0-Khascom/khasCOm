'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { QuoteType, QuoteStatus, SupplierStatus, ContactStatus } from '@prisma/client';
// In a real app we'd use nodemailer and read from SiteSetting, mocking here
// import nodemailer from 'nodemailer';

const quoteSchema = z.object({
  type: z.nativeEnum(QuoteType),
  productId: z.string().optional(),
  categoryId: z.string().optional(),
  destinationCountryId: z.string().optional(),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  buyerName: z.string().min(2, 'Name is required'),
  buyerEmail: z.string().email('Invalid email address'),
  buyerPhone: z.string().optional(),
  buyerCountry: z.string().optional(),
  message: z.string().optional(),
});

export async function submitQuoteRequest(data: z.infer<typeof quoteSchema>) {
  try {
    const validatedData = quoteSchema.parse(data);
    
    await prisma.quoteRequest.create({
      data: {
        ...validatedData,
        status: QuoteStatus.New,
      },
    });

    // TODO: Trigger email notification here
    
    return { success: true, message: 'Quote request submitted successfully. We will contact you soon.' };
  } catch (error) {
    console.error('Submit quote error', error);
    return { success: false, message: 'Failed to submit quote request. Please try again.' };
  }
}

const supplierSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  productsOffered: z.string().min(1, 'Please specify products'),
  country: z.string().optional(),
  message: z.string().optional(),
});

export async function submitSupplierApplication(data: z.infer<typeof supplierSchema>) {
  try {
    const validatedData = supplierSchema.parse(data);
    
    await prisma.supplierApplication.create({
      data: {
        ...validatedData,
        status: SupplierStatus.New,
      },
    });

    return { success: true, message: 'Supplier application submitted successfully.' };
  } catch (error) {
    console.error('Submit supplier error', error);
    return { success: false, message: 'Failed to submit application. Please try again.' };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactMessage(data: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(data);
    
    await prisma.contactMessage.create({
      data: {
        ...validatedData,
        status: ContactStatus.New,
      },
    });

    return { success: true, message: 'Message sent successfully. We will be in touch shortly.' };
  } catch (error) {
    console.error('Submit contact error', error);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
}
