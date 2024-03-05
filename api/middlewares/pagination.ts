import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../exceptions/api-errors';

export const usePagination = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const pageSize: number = parseInt(req.query.pageSize as string) || 10;

  // @ts-ignore
  req.pagination = {
    page,
    pageSize,
    // startIndex: (page - 1) * pageSize,
    // endIndex: page * pageSize,
  };

  next();
};

export class PagedList<T> {
  private constructor(
    public items: T[],
    public page: number,
    public pageSize: number,
    public totalItems: number,
    public totalPages: number
  ) {}

  public hasNextPage(): boolean {
    return this.page * this.pageSize < this.totalItems;
  }

  public hasPreviousPage(): boolean {
    return this.page > 1;
  }

  public static create<T>(
    query: T[],
    page: number,
    pageSize: number
  ): PagedList<T> {
    if (!page || !pageSize)
      throw new BadRequestError('Missing page and pageSize');
    const totalItems = query.length;
    const items = query.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(totalItems / pageSize);

    return new PagedList(items, page, pageSize, totalItems, totalPages);
  }
}
