﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:2.0.50727.1433
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace jground
{
	using System.Data.Linq;
	using System.Data.Linq.Mapping;
	using System.Data;
	using System.Collections.Generic;
	using System.Reflection;
	using System.Linq;
	using System.Linq.Expressions;
	using System.ComponentModel;
	using System;
	
	
	[System.Data.Linq.Mapping.DatabaseAttribute(Name="vips")]
	public partial class Linq2SQLDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region Extensibility Method Definitions
    partial void OnCreated();
    partial void InsertDBOBJ(DBOBJ instance);
    partial void UpdateDBOBJ(DBOBJ instance);
    partial void DeleteDBOBJ(DBOBJ instance);
    partial void InsertDBVAL(DBVAL instance);
    partial void UpdateDBVAL(DBVAL instance);
    partial void DeleteDBVAL(DBVAL instance);
    partial void InsertDBVVAL(DBVVAL instance);
    partial void UpdateDBVVAL(DBVVAL instance);
    partial void DeleteDBVVAL(DBVVAL instance);
    partial void InsertMOATT(MOATT instance);
    partial void UpdateMOATT(MOATT instance);
    partial void DeleteMOATT(MOATT instance);
    partial void InsertTUSR(TUSR instance);
    partial void UpdateTUSR(TUSR instance);
    partial void DeleteTUSR(TUSR instance);
    #endregion
		
		public Linq2SQLDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public Linq2SQLDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public Linq2SQLDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public Linq2SQLDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public System.Data.Linq.Table<DBOBJ> DBOBJs
		{
			get
			{
				return this.GetTable<DBOBJ>();
			}
		}
		
		public System.Data.Linq.Table<DBVAL> DBVALs
		{
			get
			{
				return this.GetTable<DBVAL>();
			}
		}
		
		public System.Data.Linq.Table<DBVVAL> DBVVALs
		{
			get
			{
				return this.GetTable<DBVVAL>();
			}
		}
		
		public System.Data.Linq.Table<MOATT> MOATTs
		{
			get
			{
				return this.GetTable<MOATT>();
			}
		}
		
		public System.Data.Linq.Table<TUSR> TUSRs
		{
			get
			{
				return this.GetTable<TUSR>();
			}
		}
	}
	
	[Table(Name="dbo.DBOBJ")]
	public partial class DBOBJ : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private long _oid;
		
		private int _stat;
		
		private long _ctime;
		
		private int _last_vnr;
		
		private int _last_uid;
		
		private long _last_mtime;
		
		private string _moid;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnoidChanging(long value);
    partial void OnoidChanged();
    partial void OnstatChanging(int value);
    partial void OnstatChanged();
    partial void OnctimeChanging(long value);
    partial void OnctimeChanged();
    partial void Onlast_vnrChanging(int value);
    partial void Onlast_vnrChanged();
    partial void Onlast_uidChanging(int value);
    partial void Onlast_uidChanged();
    partial void Onlast_mtimeChanging(long value);
    partial void Onlast_mtimeChanged();
    partial void OnmoidChanging(string value);
    partial void OnmoidChanged();
    #endregion
		
		public DBOBJ()
		{
			OnCreated();
		}
		
		[Column(Storage="_oid", DbType="BigInt NOT NULL", IsPrimaryKey=true)]
		public long oid
		{
			get
			{
				return this._oid;
			}
			set
			{
				if ((this._oid != value))
				{
					this.OnoidChanging(value);
					this.SendPropertyChanging();
					this._oid = value;
					this.SendPropertyChanged("oid");
					this.OnoidChanged();
				}
			}
		}
		
		[Column(Storage="_stat", DbType="Int NOT NULL")]
		public int stat
		{
			get
			{
				return this._stat;
			}
			set
			{
				if ((this._stat != value))
				{
					this.OnstatChanging(value);
					this.SendPropertyChanging();
					this._stat = value;
					this.SendPropertyChanged("stat");
					this.OnstatChanged();
				}
			}
		}
		
		[Column(Storage="_ctime", DbType="BigInt NOT NULL")]
		public long ctime
		{
			get
			{
				return this._ctime;
			}
			set
			{
				if ((this._ctime != value))
				{
					this.OnctimeChanging(value);
					this.SendPropertyChanging();
					this._ctime = value;
					this.SendPropertyChanged("ctime");
					this.OnctimeChanged();
				}
			}
		}
		
		[Column(Storage="_last_vnr", DbType="Int NOT NULL")]
		public int last_vnr
		{
			get
			{
				return this._last_vnr;
			}
			set
			{
				if ((this._last_vnr != value))
				{
					this.Onlast_vnrChanging(value);
					this.SendPropertyChanging();
					this._last_vnr = value;
					this.SendPropertyChanged("last_vnr");
					this.Onlast_vnrChanged();
				}
			}
		}
		
		[Column(Storage="_last_uid", DbType="Int NOT NULL")]
		public int last_uid
		{
			get
			{
				return this._last_uid;
			}
			set
			{
				if ((this._last_uid != value))
				{
					this.Onlast_uidChanging(value);
					this.SendPropertyChanging();
					this._last_uid = value;
					this.SendPropertyChanged("last_uid");
					this.Onlast_uidChanged();
				}
			}
		}
		
		[Column(Storage="_last_mtime", DbType="BigInt NOT NULL")]
		public long last_mtime
		{
			get
			{
				return this._last_mtime;
			}
			set
			{
				if ((this._last_mtime != value))
				{
					this.Onlast_mtimeChanging(value);
					this.SendPropertyChanging();
					this._last_mtime = value;
					this.SendPropertyChanged("last_mtime");
					this.Onlast_mtimeChanged();
				}
			}
		}
		
		[Column(Storage="_moid", DbType="NVarChar(256) NOT NULL", CanBeNull=false)]
		public string moid
		{
			get
			{
				return this._moid;
			}
			set
			{
				if ((this._moid != value))
				{
					this.OnmoidChanging(value);
					this.SendPropertyChanging();
					this._moid = value;
					this.SendPropertyChanged("moid");
					this.OnmoidChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[Table(Name="dbo.DBVAL")]
	public partial class DBVAL : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private long _oid;
		
		private int _aid;
		
		private int _vnr;
		
		private int _indx;
		
		private string _stringValue;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnoidChanging(long value);
    partial void OnoidChanged();
    partial void OnaidChanging(int value);
    partial void OnaidChanged();
    partial void OnvnrChanging(int value);
    partial void OnvnrChanged();
    partial void OnindxChanging(int value);
    partial void OnindxChanged();
    partial void OnstringValueChanging(string value);
    partial void OnstringValueChanged();
    #endregion
		
		public DBVAL()
		{
			OnCreated();
		}
		
		[Column(Storage="_oid", DbType="BigInt NOT NULL", IsPrimaryKey=true)]
		public long oid
		{
			get
			{
				return this._oid;
			}
			set
			{
				if ((this._oid != value))
				{
					this.OnoidChanging(value);
					this.SendPropertyChanging();
					this._oid = value;
					this.SendPropertyChanged("oid");
					this.OnoidChanged();
				}
			}
		}
		
		[Column(Storage="_aid", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int aid
		{
			get
			{
				return this._aid;
			}
			set
			{
				if ((this._aid != value))
				{
					this.OnaidChanging(value);
					this.SendPropertyChanging();
					this._aid = value;
					this.SendPropertyChanged("aid");
					this.OnaidChanged();
				}
			}
		}
		
		[Column(Storage="_vnr", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int vnr
		{
			get
			{
				return this._vnr;
			}
			set
			{
				if ((this._vnr != value))
				{
					this.OnvnrChanging(value);
					this.SendPropertyChanging();
					this._vnr = value;
					this.SendPropertyChanged("vnr");
					this.OnvnrChanged();
				}
			}
		}
		
		[Column(Storage="_indx", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int indx
		{
			get
			{
				return this._indx;
			}
			set
			{
				if ((this._indx != value))
				{
					this.OnindxChanging(value);
					this.SendPropertyChanging();
					this._indx = value;
					this.SendPropertyChanged("indx");
					this.OnindxChanged();
				}
			}
		}
		
		[Column(Storage="_stringValue", DbType="NVarChar(MAX) NOT NULL", CanBeNull=false)]
		public string stringValue
		{
			get
			{
				return this._stringValue;
			}
			set
			{
				if ((this._stringValue != value))
				{
					this.OnstringValueChanging(value);
					this.SendPropertyChanging();
					this._stringValue = value;
					this.SendPropertyChanged("stringValue");
					this.OnstringValueChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[Table(Name="dbo.DBVVAL")]
	public partial class DBVVAL : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private long _oid;
		
		private int _aid;
		
		private int _vnr;
		
		private int _uid;
		
		private long _mtime;
		
		private int _stat;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnoidChanging(long value);
    partial void OnoidChanged();
    partial void OnaidChanging(int value);
    partial void OnaidChanged();
    partial void OnvnrChanging(int value);
    partial void OnvnrChanged();
    partial void OnuidChanging(int value);
    partial void OnuidChanged();
    partial void OnmtimeChanging(long value);
    partial void OnmtimeChanged();
    partial void OnstatChanging(int value);
    partial void OnstatChanged();
    #endregion
		
		public DBVVAL()
		{
			OnCreated();
		}
		
		[Column(Storage="_oid", DbType="BigInt NOT NULL", IsPrimaryKey=true)]
		public long oid
		{
			get
			{
				return this._oid;
			}
			set
			{
				if ((this._oid != value))
				{
					this.OnoidChanging(value);
					this.SendPropertyChanging();
					this._oid = value;
					this.SendPropertyChanged("oid");
					this.OnoidChanged();
				}
			}
		}
		
		[Column(Storage="_aid", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int aid
		{
			get
			{
				return this._aid;
			}
			set
			{
				if ((this._aid != value))
				{
					this.OnaidChanging(value);
					this.SendPropertyChanging();
					this._aid = value;
					this.SendPropertyChanged("aid");
					this.OnaidChanged();
				}
			}
		}
		
		[Column(Storage="_vnr", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int vnr
		{
			get
			{
				return this._vnr;
			}
			set
			{
				if ((this._vnr != value))
				{
					this.OnvnrChanging(value);
					this.SendPropertyChanging();
					this._vnr = value;
					this.SendPropertyChanged("vnr");
					this.OnvnrChanged();
				}
			}
		}
		
		[Column(Storage="_uid", DbType="Int NOT NULL")]
		public int uid
		{
			get
			{
				return this._uid;
			}
			set
			{
				if ((this._uid != value))
				{
					this.OnuidChanging(value);
					this.SendPropertyChanging();
					this._uid = value;
					this.SendPropertyChanged("uid");
					this.OnuidChanged();
				}
			}
		}
		
		[Column(Storage="_mtime", DbType="BigInt NOT NULL")]
		public long mtime
		{
			get
			{
				return this._mtime;
			}
			set
			{
				if ((this._mtime != value))
				{
					this.OnmtimeChanging(value);
					this.SendPropertyChanging();
					this._mtime = value;
					this.SendPropertyChanged("mtime");
					this.OnmtimeChanged();
				}
			}
		}
		
		[Column(Storage="_stat", DbType="Int NOT NULL")]
		public int stat
		{
			get
			{
				return this._stat;
			}
			set
			{
				if ((this._stat != value))
				{
					this.OnstatChanging(value);
					this.SendPropertyChanging();
					this._stat = value;
					this.SendPropertyChanged("stat");
					this.OnstatChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[Table(Name="dbo.MOATT")]
	public partial class MOATT : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private int _aid;
		
		private string _moid;
		
		private string _attributeName;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnaidChanging(int value);
    partial void OnaidChanged();
    partial void OnmoidChanging(string value);
    partial void OnmoidChanged();
    partial void OnattributeNameChanging(string value);
    partial void OnattributeNameChanged();
    #endregion
		
		public MOATT()
		{
			OnCreated();
		}
		
		[Column(Storage="_aid", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int aid
		{
			get
			{
				return this._aid;
			}
			set
			{
				if ((this._aid != value))
				{
					this.OnaidChanging(value);
					this.SendPropertyChanging();
					this._aid = value;
					this.SendPropertyChanged("aid");
					this.OnaidChanged();
				}
			}
		}
		
		[Column(Storage="_moid", DbType="NVarChar(256) NOT NULL", CanBeNull=false)]
		public string moid
		{
			get
			{
				return this._moid;
			}
			set
			{
				if ((this._moid != value))
				{
					this.OnmoidChanging(value);
					this.SendPropertyChanging();
					this._moid = value;
					this.SendPropertyChanged("moid");
					this.OnmoidChanged();
				}
			}
		}
		
		[Column(Storage="_attributeName", DbType="NVarChar(256) NOT NULL", CanBeNull=false)]
		public string attributeName
		{
			get
			{
				return this._attributeName;
			}
			set
			{
				if ((this._attributeName != value))
				{
					this.OnattributeNameChanging(value);
					this.SendPropertyChanging();
					this._attributeName = value;
					this.SendPropertyChanged("attributeName");
					this.OnattributeNameChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[Table(Name="dbo.TUSR")]
	public partial class TUSR : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private int _uid;
		
		private string _userName;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnuidChanging(int value);
    partial void OnuidChanged();
    partial void OnuserNameChanging(string value);
    partial void OnuserNameChanged();
    #endregion
		
		public TUSR()
		{
			OnCreated();
		}
		
		[Column(Storage="_uid", DbType="Int NOT NULL", IsPrimaryKey=true)]
		public int uid
		{
			get
			{
				return this._uid;
			}
			set
			{
				if ((this._uid != value))
				{
					this.OnuidChanging(value);
					this.SendPropertyChanging();
					this._uid = value;
					this.SendPropertyChanged("uid");
					this.OnuidChanged();
				}
			}
		}
		
		[Column(Storage="_userName", DbType="NVarChar(256) NOT NULL", CanBeNull=false)]
		public string userName
		{
			get
			{
				return this._userName;
			}
			set
			{
				if ((this._userName != value))
				{
					this.OnuserNameChanging(value);
					this.SendPropertyChanging();
					this._userName = value;
					this.SendPropertyChanged("userName");
					this.OnuserNameChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
}
#pragma warning restore 1591
