using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Common.Enums
{
    public static class EnumCommons
    {
        public enum OrderStatus
        {
            [Description("Inprogess")]
            Inprocessing = 0,
            [Description("Approved")]
            Approved = 1,
            [Description("Cancel")]
            Cancelled = 2
        }

        public enum EGender
        {
            Male = 1,
            FeMale = 2,
            None = 3
        }

        public enum ERoleType
        {
            [Description("Customer")]
            Customer = 1,
            [Description("Admin")]
            Admin = 2
        }
    }
}
