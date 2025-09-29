using System;

namespace Application.Core;

public class Paginationparams<TCursor>
{
    private const int MaxPageSize = 50;
    public TCursor? Cursor { get; set; }
    private int _pageSize = 3; // default page size
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value <= 0) ? 10 : (value > MaxPageSize ? MaxPageSize : value);
    }
}
